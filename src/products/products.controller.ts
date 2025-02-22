import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PagintaionDto } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy
    ) {}

    @Post()
    createProduct() {
        return 'Product created';
    }

    @Get()
    findAllProducts(@Query() paginationDto: PagintaionDto) {
        return this.productsClient.send(
            { cmd: 'find_all_products' },
            paginationDto
        );
    }

    @Get(':id')
    async findProductById(@Param('id') id: string) {
        try {
            const product = await firstValueFrom(
                this.productsClient.send({ cmd: 'find_one_product' }, { id })
            );
            return product;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Patch(':id')
    updateProductById(@Param('id') id: string, @Body() product: any) {
        return 'Product updated';
    }

    @Delete(':id')
    deleteProductById(@Param('id') id: string) {
        return 'Product deleted';
    }
}
