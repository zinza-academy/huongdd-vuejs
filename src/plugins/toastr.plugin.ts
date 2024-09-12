import toastr from 'toastr';
import { TOAST_DEFAULT_TIME } from '@/constants';
import 'toastr/build/toastr.min.css';

export function useToastr() {
  toastr.options.positionClass = 'toast-top-right';
  toastr.options.closeButton = true;
  toastr.options.progressBar = true;
  toastr.options.timeOut = TOAST_DEFAULT_TIME;
  toastr.options.extendedTimeOut = TOAST_DEFAULT_TIME;
  return toastr;
}
