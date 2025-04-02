
import React from "react";
import { useForm } from "react-hook-form";
import { EmailRegisterFormValues, PhoneRegisterFormValues } from "@/schemas/registerSchemas";
import { SponsorInfo } from "@/utils/sponsorUtils";
import {
  NameFields,
  UsernameField,
  SponsorField,
  DateOfBirthFields,
  PasswordField,
  AccountTypeField,
  TermsCheckbox,
  SubmitButton
} from "./form-fields";

interface CommonFormFieldsProps {
  formType: "email" | "phone";
  form: ReturnType<typeof useForm<EmailRegisterFormValues | PhoneRegisterFormValues>>;
  sponsorInfo: SponsorInfo;
  checkingSponsor: boolean;
  isSubmitting: boolean;
}

const CommonFormFields: React.FC<CommonFormFieldsProps> = ({
  formType,
  form,
  sponsorInfo,
  checkingSponsor,
  isSubmitting
}) => {
  return (
    <>
      <NameFields form={form} />
      <UsernameField form={form} />
      <SponsorField 
        form={form} 
        sponsorInfo={sponsorInfo} 
        checkingSponsor={checkingSponsor} 
      />
      <DateOfBirthFields form={form} />
      <PasswordField form={form} />
      <AccountTypeField form={form} />
      <TermsCheckbox form={form} />
      <SubmitButton isSubmitting={isSubmitting} />
    </>
  );
};

export default CommonFormFields;
