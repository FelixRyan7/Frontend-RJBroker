export const isAdult = (dateStr: string): boolean => {
  const dob = new Date(dateStr);
  const now = new Date();

  const age =
    now.getFullYear() -
    dob.getFullYear() -
    (now < new Date(
      now.getFullYear(),
      dob.getMonth(),
      dob.getDate()
    )
      ? 1
      : 0);

  return age >= 18;
};
