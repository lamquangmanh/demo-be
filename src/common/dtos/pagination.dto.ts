import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Paginate: offset param. Example: /users?offset=10',
    required: false,
    default: 0,
  })
  @IsOptional()
  // @IsString()
  offset: string = '0';

  @ApiProperty({
    description: 'Paginate: limit param. Example: /users?limit=10',
    required: false,
    default: 10,
  })
  @IsOptional()
  // @IsString()
  limit: string = '10';

  @ApiProperty({
    description:
      'Search by ids. Example: /users?ids=1,2,4,5. Example in body: {ids: [1,2,3]}',
    required: false,
  })
  @IsOptional()
  ids: any;

  @ApiProperty({
    description:
      'Example: /users?sort=name_desc,createdAt_asc . default sort by createdAt desc',
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

  getOffset() {
    return Number(this.offset || 0);
  }

  getLimit() {
    return Number(this.limit || 10);
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
      offset: this.getOffset(),
      limit: this.getLimit(),
      sort: this.getSort(),
      fields: null,
    };
  }
}
