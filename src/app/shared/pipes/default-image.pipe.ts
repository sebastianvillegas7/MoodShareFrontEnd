import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {
  private readonly defaultImagePath: string = '/assets/img/default-image.png';
  private readonly emptyImageUrl: string = 'https://st.discogs.com/621e5382341ae85b3fcbcec60c336854af4b7870/images/spacer.gif';

  transform(value: string): string {
    if (!value || value === this.emptyImageUrl || value === 'undefined') {
      return this.defaultImagePath;
    } else {
      return value;
    }
  }
}
