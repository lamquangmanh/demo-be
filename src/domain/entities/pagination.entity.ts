export class IPagination {
  constructor(data: IPagination) {
    Object.assign(this, data);
  }
  page: number = 1;
  pageSize: number = 10;
  ids: any;
  sort: any;
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
    const sortDefault: any = { updated_at: 'DESC' };

    if (!this.sort) return sortDefault;
    const sort = {};
    const fields = this.sort.split(',');

    for (let i = 0; i < fields.length; i++) {
      const arrTem = fields[i].split('.');

      if (arrTem[1] === 'desc' || arrTem[1] === 'asc') {
        sort[arrTem[0]] = arrTem[1] === 'desc' ? -1 : 1;
      }
    }
    return { ...sort, ...sortDefault };
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
