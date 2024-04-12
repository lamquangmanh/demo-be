export class IPagination {
  constructor(data: IPagination) {
    Object.assign(this, data);
  }
  page: number = 1;
  pageSize: number = 10;
  ids: any;
  sort: string;
  name: string = '';

  getIds() {
    let ids: any;
    if (typeof this.ids === 'string' && this.ids) ids = this.ids.split(',');
    if (Array.isArray(this.ids)) ids = this.ids;
    return ids;
  }

  getSkip() {
    return (this.page - 1) * this.getTake();
  }

  getTake() {
    return this.pageSize;
  }

  getName() {
    return this.name || undefined;
  }

  // name.ASC
  getSort() {
    const sortDefault: any = { updated_at: 'desc' };

    if (!this.sort) return sortDefault;
    this.sort = this.sort.toLocaleLowerCase();
    const sort = {};
    const fields = this.sort.split(',');

    for (let i = 0; i < fields.length; i++) {
      const arrTem = fields[i].split('.');
      sort[arrTem[0]] = arrTem[1];
    }
    return sort;
  }

  getOptions(): any {
    return {
      where: { ids: this.getIds(), name: this.getName() },
      skip: this.getSkip(),
      take: this.getTake(),
      order: this.getSort(),
    };
  }
}
