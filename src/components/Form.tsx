import React, { ChangeEvent, useState, useEffect, useId } from "react";
import { FormProps } from "../interfaces";

const Form: React.FC<FormProps> = ({
  close,
  addItem,
  selectedTaskItem,
  resetSelectedTaskItem,
  updateTasksList,
}) => {
  const id = useId();
  const initialFormData = {
    id: id,
    name: "",
    description: "",
    status: "not completed",
    file: null as File | null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isEditFile, setisEditFile] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedTaskItem) {
      updateTasksList(formData);
      resetSelectedTaskItem();
    } else {
      addItem(formData);
      setFormData(initialFormData);
    }
    close();
  };

  useEffect(() => {
    if (selectedTaskItem) {
      setFormData({
        id: selectedTaskItem.id,
        name: selectedTaskItem.name,
        description: selectedTaskItem.description,
        status: selectedTaskItem.status,
        file: selectedTaskItem.file || null,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [selectedTaskItem]);

  useEffect(() => {
    const isFormValid =
      formData.name.trim() !== initialFormData.name &&
      formData.description.trim() !== initialFormData.description;
    setIsValid(isFormValid);
  }, [formData]);

  return (
    <form className="flex flex-col mt-16" onSubmit={handleSubmit}>
      <label className="mb-3">
        <input
          className="px-2 py-2 rounded border border-indigo-600 w-full"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Name goes here"
          name="name"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </label>
      <label className="mb-3">
        <textarea
          className="px-2 py-2 rounded border border-indigo-600 w-full"
          autoComplete="off"
          name="description"
          placeholder="Description goes here"
          onChange={handleChange}
          value={formData.description}
          required
        />
      </label>
      <fieldset className="mb-3 flex flex-col w-7/10">
        <legend className="text-left">Status</legend>
        <label className="flex items-center">
          <input
            type="radio"
            name="status"
            value="not completed"
            onChange={handleChange}
            checked={formData.status === "not completed"}
            className="w-4 h-4 mr-2"
          />
          Not Completed
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="status"
            value="completed"
            onChange={handleChange}
            checked={formData.status === "completed"}
            className="w-4 h-4 mr-2"
          />
          Completed
        </label>
      </fieldset>
      {formData.file && selectedTaskItem && !isEditFile ? (
        <div className="flex justify-between mb-2">
          <span className="mb-2">Selected file: {formData.file.name}</span>
          <button
            onClick={() => setisEditFile((prev) => !prev)}
            className="py-1 px-1"
          >
            Edit
          </button>
        </div>
      ) : (
        <label className="mb-3">
          <input
            type="file"
            name="file"
            className="px-2 py-2 rounded border border-indigo-600 w-full"
            onChange={handleFileChange}
          />
        </label>
      )}
      <button
        type="submit"
        disabled={!isValid}
        className="bg-violet-600 text-white"
      >
        Save
      </button>
    </form>
  );
};

export default Form;
