import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Access the form data here
  };
  const options = [{ name: "ar" }, { name: "en" }];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="lang" // Specify the field name
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options} // Replace options with your own array of options
            isSearchable={true}
            onChange={(selectedOption) => field.onChange(selectedOption)}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
export default MyForm;
