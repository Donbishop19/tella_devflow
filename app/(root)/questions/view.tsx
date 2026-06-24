"use client";

import { incrementViews } from "@/lib/actions/question.action";
import { useEffect } from "react";
import { toast } from "sonner";

const View = ({ questionId }: { questionId: string }) => {
  const handleIncrement = async () => {
    const results = await incrementViews({ questionId });

    if (results.success) {
      toast.success("Success", {
        description: "Views incremented"
      })
    } else {
      toast.error("Error", {
        description: results.error?.message
      })
    }
  }

  useEffect(() => {
     handleIncrement();
  }, []);
  
  return null;
}

export default View