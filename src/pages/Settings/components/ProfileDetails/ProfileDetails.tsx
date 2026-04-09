import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Camera, Loader2 } from "lucide-react";

import styles from "./ProfileDetails.module.css";

import useGetCountries from "../../../../hooks/server/settings/useGetCountries";
import useGetCities from "../../../../hooks/server/settings/useGetCities";
import type { ProfileDetailsFormInterface } from "../../../../types/components/ProfileSetting.types";


export default function ProfileDetails() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileDetailsFormInterface>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const selectedCountry = watch("country");

  const countriesQuery = useGetCountries();
  const citiesMutation = useGetCities();

  const allowedImageTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
 ];

 const [imageError, setImageError] = useState<string | null>(null);


  useEffect(() => {
    if (selectedCountry) {
      setValue("city", "");

      citiesMutation.mutate({
        country: selectedCountry,
      });
    }
  }, [selectedCountry, setValue]);

  const handleChoosePhoto = () => {
    fileInputRef.current?.click();
  };


// Handle image selection and validation
  const handleSelectImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // 1. Validation for file types
    if (!allowedImageTypes.includes(file.type)) {
      setImageError("Only PNG, JPG, JPEG and WEBP images are allowed");
      setSelectedImage(null);
      setImagePreview(null);

      // Clear the value in react-hook-form so validation fails
      setValue("image", null as any, { shouldValidate: true });
      return;
    }

    // 2. Clear previous errors
    setImageError(null);

    // 3. Update your local state (for the UI/Preview)
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);

    // 4. Update React Hook Form state
    // This ensures 'isValid' becomes true and the 'null' payload problem stops
    setValue("image", file, { shouldValidate: true });
  };



// Handle form submission
const handleUpdateProfile = (data: ProfileDetailsFormInterface) => {
  // 1. Manually check the image since it's not in the 'register'
  if (!selectedImage) {
    setImageError("Profile image is required");
    return; // Stop the function here
  }

  // 2. Check if there's an existing type error (like wrong file format)
  if (imageError) return;

  // 3. If everything is fine, proceed
  const payload = {
    ...data,
    image: selectedImage,
  };

  console.log("Success:", payload);
};

 const isButtonDisabled =
  !selectedImage ||
  !!imageError ||
  countriesQuery.isLoading ||
  citiesMutation.isPending;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Settings</h1>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Profile Details</h2>

        <div className={styles.profileImageWrapper}>
          <div
            className={styles.avatar}
            onClick={handleChoosePhoto}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" />
            ) : (
              <Camera size={20} />
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.webp"
            className={styles.hiddenInput}
            onChange={handleSelectImage}
          />

          <button
            type="button"
            className={styles.photoBtn}
            onClick={handleChoosePhoto}
          >
            Choose photo
          </button>

          {imageError && (
            <p className={styles.error}>{imageError}</p>
          )}
          
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <div className={styles.field}>
            <label>User Name</label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label>About</label>
            <textarea
              rows={6}
              placeholder="Tell something about yourself"
              {...register("about", {
                required: "About is required",
              })}
            />
            {errors.about && (
              <p className={styles.error}>{errors.about.message}</p>
            )}
          </div>

          <h2 className={styles.sectionTitle}>Location</h2>

          <div className={styles.field}>
            <label>Country</label>

            <select
              {...register("country", {
                required: "Country is required",
              })}
              disabled={countriesQuery.isLoading}
            >
              <option value="">
                {countriesQuery.isLoading
                  ? "Loading countries..."
                  : "Select country"}
              </option>

              {countriesQuery.data?.data?.map((country) => (
                <option key={country.Iso2} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>

            {countriesQuery.isLoading && (
              <div className={styles.loaderBox}>
                <Loader2
                  size={14}
                  className={styles.loaderIcon}
                />
                <span>Loading countries...</span>
              </div>
            )}

            {errors.country && (
              <p className={styles.error}>{errors.country.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label>City</label>

            <select
              {...register("city", {
                required: "City is required",
              })}
              disabled={!selectedCountry || citiesMutation.isPending}
            >
              <option value="">
                {citiesMutation.isPending
                  ? "Loading cities..."
                  : "Select city"}
              </option>

              {citiesMutation.data?.data?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {citiesMutation.isPending && (
              <div className={styles.loaderBox}>
                <Loader2
                  size={14}
                  className={styles.loaderIcon}
                />
                <span>Loading cities...</span>
              </div>
            )}

            {errors.city && (
              <p className={styles.error}>{errors.city.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label>Area</label>
            <input
              type="text"
              placeholder="Enter your area"
              {...register("area", {
                required: "Area is required",
              })}
            />

            {errors.area && (
              <p className={styles.error}>{errors.area.message}</p>
            )}
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn}>
              Update Profile
            </button>

            <button type="button" className={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}