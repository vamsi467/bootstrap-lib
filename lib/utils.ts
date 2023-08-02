import Swal from "sweetalert2";

export const errorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title,
    text,
  });
};
