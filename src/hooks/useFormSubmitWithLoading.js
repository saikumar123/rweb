import { useState, useCallback } from "react";

export const useFormSubmitWithLoading = (onSubmit) => {
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = useCallback(
    async (values, formikHelpers) => {
      setLoading(true);
      if (typeof onSubmit === "function") {
        await onSubmit(values, formikHelpers);
      }
      setLoading(false);
    },
    [onSubmit]
  );

  return { onSubmitHandler, loading };
};
