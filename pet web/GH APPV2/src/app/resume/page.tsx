'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { GitHubUser, GitHubRepo, LanguageStat, TechFramework, ResumeData } from '@/types';
import {
  fetchUser, fetchRepos, fetchRepoLanguages,
  computeLanguages, computeFrameworks,
} from '@/lib/github';
import TopBar from '@/components/TopBar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516',
  PHP: '#4F5D95', Swift: '#F05138', Kotlin: '#A97BFF', HTML: '#e34c26',
  CSS: '#563d7c', Shell: '#89e051', Dart: '#00B4AB', Vue: '#41b883',
};

const CATEGORIES: Record<string, string[]> = {
  Frontend: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Fastify', 'NestJS'],
  Database: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'SQLite'],
  DevOps: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'GitHub Actions'],
  'Machine Learning': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
};

function categorizeSkill(name: string): string {
  for (const [cat, skills] of Object.entries(CATEGORIES)) {
    if (skills.some(s => s.toLowerCase() === name.toLowerCase())) return cat;
  }
  return 'Other';
}

const DEFAULT_RESUME: ResumeData = {
  skills: [],
  aboutMe: '',
};

import { Suspense } from 'react';

function ResumeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const username = searchParams.get('user') || '';
  const resumeRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [frameworks, setFrameworks] = useState<TechFramework[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME);
  const [newSkill, setNewSkill] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!username) { router.push('/'); return; }

    const saved = localStorage.getItem(`resume-${username}`);
    if (saved) {
      try { setResumeData(JSON.parse(saved)); } catch { /* keep defaults */ }
    }

    let cancelled = false;
    async function load() {
      try {
        const [userData, reposData] = await Promise.all([
          fetchUser(username),
          fetchRepos(username),
        ]);
        if (cancelled) return;
        setUser(userData);
        setRepos(reposData);

        const langMap: Record<string, Record<string, number>> = {};
        await Promise.all(
          reposData.slice(0, 20).map(async (repo) => {
            const langs = await fetchRepoLanguages(username, repo.name);
            if (!cancelled) langMap[repo.name] = langs;
          })
        );
        if (cancelled) return;
        setLanguages(computeLanguages(reposData, langMap));
        setFrameworks(computeFrameworks(reposData));

        const savedResume = localStorage.getItem(`resume-${username}`);
        if (!savedResume) {
          const autoSkills = computeFrameworks(reposData).map(f => ({
            name: f.name,
            rating: Math.min(10, Math.max(5, f.count + 4)),
          }));
          setResumeData({ skills: autoSkills, aboutMe: '' });
        }
        setLoading(false);
      } catch {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [username, router]);

  useEffect(() => {
    if (!loading && username) {
      localStorage.setItem(`resume-${username}`, JSON.stringify(resumeData));
    }
  }, [resumeData, loading, username]);

  const addSkill = () => {
    if (!newSkill.trim()) return;
    if (resumeData.skills.some(s => s.name.toLowerCase() === newSkill.trim().toLowerCase())) return;
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: newSkill.trim(), rating: newRating }],
    }));
    setNewSkill('');
    setNewRating(5);
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const updateSkillRating = (index: number, rating: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((s, i) => i === index ? { ...s, rating } : s),
    }));
  };

  const handleExportPDF = async () => {
    if (!resumeRef.current) return;
    setExporting(true);

    try {
      const el = resumeRef.current;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;

      let position = 0;
      const pageH = pdf.internal.pageSize.getHeight();

      while (position < pdfH) {
        if (position > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -position, pdfW, pdfH);
        position += pageH;
      }

      pdf.save(`${username}-resume.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    }
    setExporting(false);
  };

  if (!username) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-github-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  const categorized = resumeData.skills.reduce<Record<string, typeof resumeData.skills>>((acc, s) => {
    const cat = categorizeSkill(s.name);
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  const topRepos = repos.slice(0, 5);

  return (
    <div className="min-h-screen bg-github-bg">
      <TopBar username={username} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6 page-enter">
          <div>
            <h1 className="text-2xl font-bold text-github-text">Resume Builder</h1>
            <p className="text-sm text-github-muted mt-1">Customize your profile and export as PDF</p>
          </div>
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {exporting ? 'Exporting...' : 'Export to PDF'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Edit Panel */}
          <div className="lg:col-span-1 space-y-4 page-enter" style={{ animationDelay: '0.1s' }}>
            <div className="card-base p-5">
              <h3 className="section-title">Add Skill</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addSkill()}
                  placeholder="e.g. React, Docker, Teamwork"
                  className="input-base"
                />
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-github-muted">Rating: {newRating}/10</label>
                  </div>
                  <input
                    type="range"
                    min={0} max={10} value={newRating}
                    onChange={e => setNewRating(parseInt(e.target.value))}
                    className="w-full accent-github-accent"
                  />
                </div>
                <button onClick={addSkill} className="btn-primary w-full text-sm">
                  Add Skill
                </button>
              </div>
            </div>

            <div className="card-base p-5">
              <h3 className="section-title">About Me</h3>
              <textarea
                value={resumeData.aboutMe}
                onChange={e => setResumeData(prev => ({ ...prev, aboutMe: e.target.value }))}
                placeholder="Write a brief introduction about yourself..."
                className="input-base min-h-[120px] resize-y"
                rows={5}
              />
            </div>

            <div className="card-base p-5">
              <h3 className="section-title">Your Skills ({resumeData.skills.length})</h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {resumeData.skills.length === 0 && (
                  <p className="text-xs text-github-muted">No skills added yet. Use the form above to add skills.</p>
                )}
                {resumeData.skills.map((skill, i) => (
                  <div key={`${skill.name}-${i}`} className="flex items-center gap-2 p-2 rounded-lg bg-github-hover">
                    <span className="text-sm text-github-text flex-1 truncate">{skill.name}</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="range"
                        min={0} max={10} value={skill.rating}
                        onChange={e => updateSkillRating(i, parseInt(e.target.value))}
                        className="w-16 accent-github-accent"
                      />
                      <span className="text-xs text-github-muted w-6 text-right">{skill.rating}</span>
                    </div>
                    <button
                      onClick={() => removeSkill(i)}
                      className="text-chart-coral hover:text-chart-coral/80 p-1"
                      aria-label={`Remove ${skill.name}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-2 page-enter" style={{ animationDelay: '0.2s' }}>
            <div ref={resumeRef} className="bg-white text-gray-900 rounded-xl shadow-card overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-8">
                <div className="flex items-center gap-5">
                  {user && (
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="w-20 h-20 rounded-full border-2 border-white/20"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name || user?.login}</h2>
                    <p className="text-slate-300 text-sm mt-1">Full Stack Developer</p>
                    <p className="text-slate-400 text-xs mt-1">@{username}</p>
                  </div>
                </div>
                {resumeData.aboutMe && (
                  <p className="mt-4 text-slate-300 text-sm leading-relaxed border-t border-white/10 pt-4">
                    {resumeData.aboutMe}
                  </p>
                )}
              </div>

              <div className="p-8 space-y-8">
                {/* Tech Stack */}
                {Object.keys(categorized).length > 0 && (
                  <section>
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                      Tech Stack
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(categorized).map(([cat, skills]) => (
                        <div key={cat}>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{cat}</p>
                          <div className="flex flex-wrap gap-2">
                            {skills.map(s => (
                              <div key={s.name} className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1.5">
                                <span className="text-sm font-medium text-slate-700">{s.name}</span>
                                <div className="flex gap-0.5">
                                  {Array.from({ length: 10 }, (_, i) => (
                                    <div
                                      key={i}
                                      className={`w-1.5 h-1.5 rounded-full ${i < s.rating ? 'bg-blue-500' : 'bg-slate-300'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                  <section>
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                      Top Languages
                    </h3>
                    <div className="space-y-2">
                      {languages.map(lang => (
                        <div key={lang.language} className="flex items-center gap-3">
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: lang.color }} />
                          <span className="text-sm font-medium text-slate-700 w-24">{lang.language}</span>
                          <div className="flex-1 bg-slate-200 rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full transition-all"
                              style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 w-10 text-right">{lang.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* GitHub Stats */}
                {user && (
                  <section>
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                      GitHub Stats
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {[
                        { label: 'Repositories', value: user.public_repos },
                        { label: 'Followers', value: user.followers },
                        { label: 'Following', value: user.following },
                      ].map(s => (
                        <div key={s.label} className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-xl font-bold text-slate-800">{s.value.toLocaleString()}</div>
                          <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {topRepos.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Recent Projects</p>
                        <div className="space-y-2">
                          {topRepos.map(repo => (
                            <div key={repo.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-sm font-medium text-slate-700 truncate">{repo.name}</span>
                                {repo.language && (
                                  <>
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: LANG_COLORS[repo.language] || '#8B949E' }} />
                                    <span className="text-xs text-slate-500">{repo.language}</span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                                <span className="flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
                                  {repo.stargazers_count}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* Footer */}
                <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-200">
                  Generated by GitHub Profile Analyzer &middot; @{username} &middot; {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-github-accent border-t-transparent rounded-full" />
      </div>
    }>
      <ResumeContent />
    </Suspense>
  );
}
