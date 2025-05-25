"use client";

import { useFormStatus } from "react-dom";
import LoadingButton from "@/components/ui/loadingButton";

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <LoadingButton
      className="w-full bg-black border border-solid border-[#2E2E2E] py-1.5 mt-2.5 rounded transition-all hover:bg-[#1F1F1F] hover:border-[#454545] text-13"
      type="submit"
      loading={pending}
    >
      {text}
    </LoadingButton>
  );
}
