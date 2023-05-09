import { Pipe, PipeTransform } from '@angular/core';
import { Contract } from 'src/app/shared/component/contract/contract';
import { Observable, map } from 'rxjs'

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {

  transform(value: Contract[] | null, searchString: string): any {
    if (!searchString || searchString.length === 0) return value
    else {
      let result;
      result = value?.filter(
          (contract: Contract) => {
            if (contract.title && contract.title.toLocaleLowerCase().startsWith(searchString.toLocaleLowerCase())) {
              return true
            }
            else {
              return false
            }
          }
        )
      return result
    }
  }
}
