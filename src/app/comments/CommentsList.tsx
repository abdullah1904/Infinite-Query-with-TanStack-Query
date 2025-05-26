"use client";

import { Loader2 } from "lucide-react";
import { Comment } from "./Comment";
import { Button } from "@/components/ui/button";
import { useComments } from "./use-comments-hooks";

export default function CommentsList() {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useComments();
  const comments = data?.pages.flatMap(page => page.comments);
  if (isPending) {
    return <Loader2 className="animate-spin mx-auto" />
  }
  return (
    <div className="space-y-4">
      {comments && comments.length > 0 && (
        <>
          <div className="space-y-3">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment}/>
            ))}
          </div>
          <div className="flex justify-center my-4">
            {hasNextPage && (
              <Button onClick={()=> fetchNextPage()} disabled={isFetchingNextPage} className="px-4 py-2">
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </Button>
            )}
          </div>
        </>
      )}
      {!isError && !comments?.length && (
        <div className="text-center">
          No comments yet.
        </div>
      )}
      {isError && (
        <div className="text-center text-red-500">
          Error loading comments: {error.message}
        </div>
      )}
    </div>
  )
}
