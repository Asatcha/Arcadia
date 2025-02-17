import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(birthDate: string | Date): string {
    if (!birthDate) return 'Date invalide';

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
      years--;
      months += 12;
    }

    let result = [];
    if (years > 0) result.push(`${years} an${years > 1 ? 's' : ''}`);
    if (months > 0) result.push(`${months} mois`);

    return result.length > 0 ? result.join(' ') : 'Moins d’un mois';
  }
}
