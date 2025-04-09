"use client";

import { CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./button";
import { Link } from "@/i18n/navigation";

interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
const WriteComment = ({ _id }: { _id: string }) => {
  const { data: session } = useSession();
  //   const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const userImage = session?.user?.image || "";

    try {
      fetch("/api/create-comment", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          imageUrl: userImage,
        }),
      });
    } catch (error) {
      console.error("Create comment error", error);
    } finally {
      setSubmitted(true);
    }
  };
  return (
    <>
      {submitted ? (
        <div className="flex items-center justify-center p-5">
          <div className="w-full max-w-2xl rounded-lg bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 px-6 py-16 text-white shadow-xl">
            <div className="my-4 flex flex-col items-center">
              <CheckCircle className="h-16 w-16 text-green-300" />
              <h1 className="text-center text-3xl font-bold">
                Thank you for submitting your comment!
              </h1>
              <p className="text-center text-lg">
                Once it has been approved by our admin, it will appear below.
              </p>
              <div className="mt-6 text-sm text-gray-300">
                We appreciate your patience and value your contribution.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex max-w-2xl flex-col p-5"
        >
          <h3 className="text-sm font-bold text-blue-600">
            Enjoyed this article?
          </h3>
          <h4 className="text-3xl font-bold">Leave a Comment below!</h4>
          <hr className="mt-2 py-3" />
          <input {...register('_id')} type="hidden" name="_id" value={_id} />
          <div className="mb-2 flex flex-col gap-1">
            <label className="font-medium text-gray-700">Name</label>
            <input
              disabled={!session?.user}
              {...register('name', { required: true })}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-md border-2 bg-white px-4 py-2 text-gray-700 outline-hidden focus:border-blue-600"
            />
          </div>
          <div className="mb-2 flex flex-col gap-1">
            <label className="font-medium text-gray-700">Email</label>
            <input
              disabled={!session?.user}
              {...register('email', { required: true })}
              type="email"
              placeholder="Provide a valid email"
              className="w-full rounded-md border-2 bg-white px-4 py-2 text-gray-700 outline-hidden focus:border-blue-600"
            />
          </div>
          <div className="mb-2 flex flex-col gap-1">
            <label className="font-medium text-gray-700">Comment</label>
            <textarea
              disabled={!session?.user}
              {...register('comment', { required: true })}
              placeholder="Type your comments..."
              className="w-full resize-none rounded-md border-2 bg-white px-4 py-2 text-gray-700 outline-hidden focus:border-blue-600"
              rows={5}
            />
          </div>
          {errors && (
            <div className="mb-3 flex flex-col">
              {errors.name && (
                <span className="text-red-600">
                  - The Name Field is Required
                </span>
              )}
              {errors.email && (
                <span className="text-red-600">
                  - The Email Field is Required
                </span>
              )}
              {errors.comment && (
                <span className="text-red-600">
                  - The Comment Field is Required
                </span>
              )}
            </div>
          )}
          <Button
            type="submit"
            disabled={!session?.user}
            className="w-full rounded-md bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 py-2 text-white transition-all duration-300 hover:from-blue-700 hover:to-pink-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-hidden"
          >
            Submit
          </Button>
          {!session?.user && (
            <div className="mt-2 flex items-center gap-2">
              <p>Please login to write a comment</p>{' '}
              <Link
                href={'/login'}
                className="font-semibold underline decoration-[1px] underline-offset-2"
              >
                Login
              </Link>
            </div>
          )}
        </form>
      )}
    </>
  )
};

export default WriteComment;
