import { useForm } from "react-hook-form";

import { useQueryParamsUpdate } from "../useQueryParamsUpdate";

interface FormData {
  page: number;
  limit: number;
}

export default function IndexPage() {
  const { searchParams, updateQueryParams } = useQueryParamsUpdate();
  const queryPage = searchParams.get("page");
  const queryLimit = searchParams.get("limit");

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      page: queryPage ? parseInt(queryPage, 10) : 1,
      limit: queryLimit ? parseInt(queryLimit, 10) : 10,
    },
  });

  const onSubmit = (data: FormData): void => {
    updateQueryParams({
      page: data.page,
    });
    updateQueryParams({
      limit: data.limit,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Page:
        <input type="number" {...register("page")} />
      </label>
      <label>
        Limit:
        <input type="number" {...register("limit")} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
