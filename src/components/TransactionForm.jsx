"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const schema = yup.object({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Must be positive")
    .required("Amount is required"),
  description: yup.string().required("Description is required"),
  date: yup
    .date()
    .typeError("Date is required")
    .max(new Date(), "Date cannot be in the future") // ✅ Add this line
    .required("Date is required"),
});

const TransactionForm = ({ onSaved, editData, clearEdit }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: "",
      description: "",
      date: new Date(),
    },
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editData) {
      setValue("amount", editData.amount);
      setValue("description", editData.description);
      setValue("date", new Date(editData.date));
    }
  }, [editData, setValue]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    const url = editData
      ? `/api/transactions/${editData._id}`
      : "/api/transactions";
    const method = editData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          amount: Number(data.amount),
          date: data.date.toISOString(),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to save transaction.");
        return;
      }

      reset();
      clearEdit();
      onSaved();
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        {editData ? "Edit Transaction" : "Transaction Details"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Amount */}
        <div>
          <Label htmlFor="amount" className="text-slate-300 mb-2 block">
            Amount (₹)
          </Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount")}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
          {errors.amount && (
            <p className="text-red-400 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-slate-300 mb-2 block">
            Description
          </Label>
          <Input
            id="description"
            type="text"
            placeholder="Enter transaction description"
            {...register("description")}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Date (shadcn Calendar) */}
        <div>
          <Label htmlFor="date" className="text-slate-300 mb-2 block">
            Date
          </Label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-600 text-white">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    disabled={(date) => date > new Date()} // ✅ Add this line
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.date && (
            <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={submitting}
            className={`flex-1 bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200 ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting
              ? editData
                ? "Updating..."
                : "Saving..."
              : editData
              ? "Update"
              : "Add"}{" "}
            Transaction
          </Button>

          {editData && (
            <Button
              type="button"
              onClick={() => {
                reset();
                clearEdit();
              }}
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
