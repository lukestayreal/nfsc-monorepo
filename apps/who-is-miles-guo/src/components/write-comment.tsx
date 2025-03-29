"use client";

import { CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./button";
import Link from "next/link";

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
          <div className="w-full max-w-2xl px-6 py-16 rounded-lg shadow-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-300" />
              <h1 className="text-3xl font-bold text-center">
                Thank you for submitting your comment!
              </h1>
              <p className="text-lg text-center">
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
          className="flex flex-col p-5 max-w-2xl mx-auto"
        >
          <h3 className="text-sm text-blue-600 font-bold">
            Enjoyed this article?
          </h3>
          <h4 className="text-3xl font-bold">Leave a Comment below!</h4>
          <hr className="py-3 mt-2" />
          <input {...register("_id")} type="hidden" name="_id" value={_id} />
          <div className="flex flex-col gap-1 mb-2">
            <label className="text-gray-700 font-medium">Name</label>
            <input
              disabled={!session?.user}
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 text-gray-700 bg-white border-2 outline-none focus:border-blue-600 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              disabled={!session?.user}
              {...register("email", { required: true })}
              type="email"
              placeholder="Provide a valid email"
              className="w-full px-4 py-2 text-gray-700 bg-white border-2 outline-none focus:border-blue-600 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label className="text-gray-700 font-medium">Comment</label>
            <textarea
              disabled={!session?.user}
              {...register("comment", { required: true })}
              placeholder="Type your comments..."
              className="w-full px-4 py-2 text-gray-700 bg-white border-2 outline-none focus:border-blue-600 rounded-md resize-none"
              rows={5}
            />
          </div>
          {errors && (
            <div className="flex flex-col mb-3">
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
            className="w-full py-2 text-white rounded-md transition-all duration-300 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </Button>
          {!session?.user && (
            <div className="flex items-center gap-2 mt-2">
              <p>Please login to write a comment</p>{" "}
              <Link
                href={"/login"}
                className="font-semibold underline underline-offset-2 decoration-[1px]"
              >
                Login
              </Link>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default WriteComment;
