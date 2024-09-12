import { useToastr } from '@/plugins/toastr.plugin';

const toastr = useToastr();

export function selectMany(target: String) {
  const selectAll = document.querySelector(`#select_all_${target}`) as HTMLInputElement;
  selectAll?.addEventListener('click', () => {
    document.querySelectorAll('.checkbox_ids').forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = selectAll.checked;
    });
  });
}

export function deleteManyRecords(target: String, apiFunction: Function) {
  document.querySelector(`#delete_selected_${target}`)?.addEventListener('click', function (event) {
    event.preventDefault();
    const all_ids: String[] = [];
    document.querySelectorAll('.checkbox_ids:checked').forEach(function (checkbox) {
      all_ids.push((checkbox as HTMLInputElement).value);
    });
    const confirmed = confirm('Are you sure to delete these records?');
    if (confirmed) {
      if (all_ids.length > 0) {
        apiFunction(all_ids)
          .then((resp) => {
            toastr.success(`Deleted ${target} successfully`);
            all_ids.forEach((id) => {
              document.querySelector(`#${target}_${id}`)?.remove();
            });
          })
          .catch((error) => {
            toastr.error('An error has occurred! ' + error);
          });
      } else {
        toastr.info('Please select users first');
      }
    }
  });
}
