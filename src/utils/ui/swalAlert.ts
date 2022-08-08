import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const swal = withReactContent(
  Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success-primary",
      cancelButton: "btn btn-outline-primary",
      denyButton: "btn btn-outline-primary",
    },
    backdrop: "rgba(205, 218, 229, 0.75)",
  })
);

export const swal_error = withReactContent(
  Swal.mixin({
    customClass: {
      popup: "warning",
      confirmButton: "btn btn-success-primary",
      cancelButton: "btn btn-outline-primary",
      denyButton: "btn btn-cancel-primary",
      title: 'title-myswal-alert',
    },
    showCloseButton: true,
    reverseButtons: true,
    width: 662,
    backdrop: "rgba(162, 103, 95, 0.85)",
  })
);

export const swal_success = withReactContent(
  Swal.mixin({
    customClass: {
      popup: "success",
      confirmButton: "btn btn-success-primary",
      cancelButton: "btn btn-outline-primary",
      denyButton: "btn btn-outline-primary",
      title: 'title-myswal-alert-success'
    },
    showCloseButton: true,
    reverseButtons: true,
    width: 662,
    backdrop: "rgba(75 ,100 ,59,0.75)",
  })
);
