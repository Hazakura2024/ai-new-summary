import { create } from "zustand";
import { createSummary } from "@/app/actions";

interface SummaryState {
    isLoading: boolean,
    error: string | null,
    summaryLines: string[] | null,
    articleTitle: string | null,
    sourceUrl: string,
    setSourceUrl: (url: string) => void;
    generateSummary: (formData: FormData) => Promise<void>;
    reset: () => void;
}

export const useSummaryStore = create<SummaryState>((set) => ({
    isLoading: false,
    error: null,
    summaryLines: null,
    articleTitle: null,
    sourceUrl: "",

    setSourceUrl: (url) => set({ sourceUrl: url }),

    generateSummary: async (formData: FormData) => {
        set({ isLoading: true, error: null, summaryLines: null, articleTitle: null});

        try {
            const result = await createSummary(formData);

            if (result.success) {
                set({ isLoading: false, error: result.error || "要約の生成に失敗しました。" });
            }
        } catch (error) {
            set({ isLoading: false, error: "通信エラーが発生しました" });
        }


        
    },
    reset: () => set({ isLoading:false, error:null, summaryLines: null, articleTitle: null, sourceUrl: ""}),
}))