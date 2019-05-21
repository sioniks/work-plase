// function validateEmail(email) {
//   let re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[­[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// }



// $(document).ready(function () {
//   $('.subscribe__mail-input').bind('input', function () {
//     let mail = $(this).val();
//     if (validateEmail(mail)) {
//       $(this).closest('.button-wrap').find('.subscribe__mail-link').removeClass('is-disabled');
//       $(this).closest('.button-wrap').find('.subscribe__wrap-input').removeClass('has-error');
//     } else {
//       $(this).closest('.button-wrap').find('.subscribe__wrap-input').addClass('has-error');
//       $(this).closest('.button-wrap').find('.subscribe__mail-link').addClass('is-disabled');
//     }
//   });

//   $('.subscribe__mail-input').blur(function () {
//     $(this).closest('.button-wrap').find('.subscribe__wrap-input').removeClass('has-error');
//   });

// });

// $(document).on('click', '.subscribe__mail-link', function () {
//   if ($('.subscribe__mail-link.is-disabled') == false) {
//     $(this).closest('.button-wrap').find('.subscribe__wrap-input').val();
//   }
// });


// $(document).ready(function () {
//   $('.info__mail-input').bind('input', function () {
//     let mail = $(this).val();
//     if (validateEmail(mail)) {
//       $(this).closest('.button-wrap').find('.info__mail-link').removeClass('is-disabled');
//       $(this).closest('.button-wrap').find('.info__wrap-input').removeClass('has-error');
//     } else {
//       $(this).closest('.button-wrap').find('.info__wrap-input').addClass('has-error');
//       $(this).closest('.button-wrap').find('.info__mail-link').addClass('is-disabled');
//     }
//   });

//   $('.info__mail-input').blur(function () {
//     $(this).closest('.button-wrap').find('.info__wrap-input').removeClass('has-error');
//   });

// });

// $(document).on('click', '.info__mail-link', function () {
//   if ($('.info__mail-link.is-disabled') == false) {
//     $(this).closest('.button-wrap').find('.info__wrap-input').val();
//   }
// });
