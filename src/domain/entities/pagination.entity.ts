import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { FindManyOptions } from 'typeorm';

export class IPagination {
  constructor(data: IPagination) {
    this.ids = data.ids;
    this.page = data.page;
    this.pageSize = data.pageSize;
    this.sort = data.sort;
    this.name = data.name;
  }
  @ApiProperty({
    description: 'Paginate: page param. Example: /users?page=10',
    required: false,
    default: 0,
  })
  @IsOptional()
  // @IsString()
  page: string = '0';

  @ApiProperty({
    description: 'Paginate: pageSize param. Example: /users?pageSize=10',
    required: false,
    default: 10,
  })
  @IsOptional()
  // @IsString()
  pageSize: string = '10';

  @ApiProperty({
    description: 'Search by ids. Example: /users?ids=1,2,4,5. Example in body: {ids: [1,2,3]}',
    required: false,
  })
  @IsOptional()
  ids: any;

  @ApiProperty({
    description: 'Example: /users?sort=name_desc,createdAt_asc . default sort by createdAt desc',
    required: false,
  })
  @IsOptional()
  @IsString()
  sort: any = 'updatedAt_desc';

  @ApiProperty({
    description: 'Example: /users?name=fcmuser.',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  getIds() {
    let ids: any;
    if (typeof this.ids === 'string' && this.ids) ids = this.ids.split(',');
    if (Array.isArray(this.ids)) ids = this.ids;
    return ids;
  }

  getSkip() {
    return (Number(this.page || 1) - 1) * this.getTake();
  }

  getTake() {
    return Number(this.pageSize || 10);
  }

  getName() {
    return this.name || undefined;
  }

  getSort() {
    let sort: any = { id: 'ASC' };

    if (this.sort) {
      const fields = this.sort.split(',');
      if (fields.length > 0) sort = {};

      for (let i = 0; i < fields.length; i++) {
        const arrTem = fields[i].split('_');

        if (arrTem[1] === 'desc' || arrTem[1] === 'asc') {
          sort[arrTem[0]] = arrTem[1] === 'desc' ? -1 : 1;
        }
      }
    }

    return sort;
  }

  getOptions(): FindManyOptions {
    return {
      where: { ids: this.getIds(), name: this.getName() },
      skip: this.getSkip(),
      take: this.getTake(),
      order: this.getSort(),
    };
  }
}
