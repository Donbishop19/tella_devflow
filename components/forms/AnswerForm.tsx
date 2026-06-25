// /components/forms/AuthForm.tsx
"use client";

import {standardSchemaResolver} from "@hookform/resolvers/standard-schema";
import {
  useForm,
} from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AnswerSchema } from "@/lib/validations";
import { useRef, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { toast } from "sonner";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const AnswerForm = ({ questionId }: {questionId: string}) => {
  const [isAnswering, startAnsweringTransition] = useTransition();
  const [isAISubmitting, setisAISubmitting] = useState(false);

  const editorRef = useRef<MDXEditorMethods>(null);


  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: standardSchemaResolver(AnswerSchema),
    defaultValues: {
      content: ""
    }
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const result = await createAnswer({
        questionId,
        content: values.content,
      });

      if (result.success) {
        form.reset();

        toast.success("Answer posted successfully", {
          description: 'Your answer has been posted successfully'
        })
      } else {
        toast.error("Error", {
          description: result.error?.message
        })
      }
    });
    

    
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark200_light800">Write Your Answer here</h4>
        <button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500" disabled={isAISubmitting}>
          {isAISubmitting ? ( 
            <>
              <ReloadIcon 
                className="mr-2 size-4 animate-spin" 
              />
              Generating...
              </>
            ) : <>
              <Image 
                src="/icons/stars.svg"
                alt="Generate AI Answer"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          }
        </button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField 
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor 
                    value={field.value}
                    editorRef={editorRef}
                    fieldChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="primary-gradient w-fit">
              {isAnswering ? ( 
                <>
                  <ReloadIcon 
                    className="mr-2 size-4 animate-spin" 
                  />
                  Posting...
                  </>
              ) : (
                "Post Answer"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>  
  );    
}

export default AnswerForm