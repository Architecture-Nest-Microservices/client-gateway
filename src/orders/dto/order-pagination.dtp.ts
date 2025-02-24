import { IsEnum, IsOptional } from 'class-validator';
import { PagintaionDto } from 'src/common';
import { OrderStatus, OrderStatusList } from '../enum';

export class OrderPaginationDto extends PagintaionDto {
    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Possible status values: ${OrderStatusList}`
    })
    status?: OrderStatus;
}
