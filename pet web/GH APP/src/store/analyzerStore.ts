import { create } from "zustand";
import { ActivityPoint, GithubRepo, GithubUser, RepoAnalysis } from "../types/github";
import { fetchProfileBundle } from "../lib/github";

interface AnalyzerState {
  username: string;
  user: GithubUser | null;
  repos: GithubRepo[];
  repoAnalyses: RepoAnalysis[];
  activity: ActivityPoint[];
  loading: boolean;
  error: string | null;
  loadUser: (username: string) => Promise<void>;
  clearError: () => void;
}

export const useAnalyzerStore = create<AnalyzerState>((set) => ({
  username: "",
  user: null,
  repos: [],
  repoAnalyses: [],
  activity: [],
  loading: false,
  error: null,
  async loadUser(username) {
    set({ username, loading: true, error: null });
    try {
      const bundle = await fetchProfileBundle(username);
      set({
        user: bundle.user,
        repos: bundle.repos,
        repoAnalyses: bundle.repoAnalyses,
        activity: bundle.activity,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unable to load GitHub profile.",
        loading: false,
      });
    }
  },
  clearError() {
    set({ error: null });
  },
}));
