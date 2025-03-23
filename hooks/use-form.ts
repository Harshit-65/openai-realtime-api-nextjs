"use client";

import { toast } from "sonner";
import { useTranslations } from "@/components/translations-context";
import { useFormStore } from "./use-form-store";
import { FormData } from "@/components/FormModal";

export const useForm = () => {
  const { t } = useTranslations();
  const { 
    isFormOpen, 
    setIsFormOpen, 
    lastFormSubmission, 
    setLastFormSubmission 
  } = useFormStore();

  const openForm = () => {
    setIsFormOpen(true);
    toast.info(t('form.opened') || "Form opened", {
      description: t('form.openedDescription') || "Please fill in the required information.",
    });
    return {
      success: true,
      message: t('form.openedMessage') || "Form has been opened. Please ask the user to fill in their information."
    };
  };

  const handleFormSubmit = (formData: FormData) => {
    setLastFormSubmission(formData);
    
    toast.success(t('form.submitted') || "Form submitted", {
      description: t('form.submittedDescription') || "Thank you for submitting the form.",
    });
  };

  const getLastFormSubmission = () => {
    if (!lastFormSubmission.timestamp) {
      return {
        success: false,
        message: t('form.noSubmissions') || "No forms have been submitted yet."
      };
    }
    
    const submissionDate = new Date(lastFormSubmission.timestamp);
    const formattedDate = submissionDate.toLocaleString();
    
    return {
      success: true,
      timestamp: lastFormSubmission.timestamp,
      formattedTimestamp: formattedDate,
      message: t('form.lastSubmission') || `Last form was submitted on ${formattedDate}.`
    };
  };

  return {
    isFormOpen,
    setIsFormOpen,
    openForm,
    handleFormSubmit,
    getLastFormSubmission,
    lastFormSubmission,
  };
}; 