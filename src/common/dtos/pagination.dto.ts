import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {
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

  getIds() {
    let ids: any = [];
    if (typeof this.ids === 'string' && this.ids) ids = this.ids.split(',');
    if (Array.isArray(this.ids)) ids = this.ids;
    return ids;
  }

  getPage() {
    return Number(this.page || 0);
  }

  getPageSize() {
    return Number(this.pageSize || 10);
  }

  getSort() {
    let sort: any = { _id: -1 };

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

  getOptions() {
    return {
      page: this.getPage(),
      pageSize: this.getPageSize(),
      sort: this.getSort(),
      fields: null,
    };
  }
}
