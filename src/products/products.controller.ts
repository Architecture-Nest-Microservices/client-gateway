import {
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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
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
        // otra forma de capturar el error
        return this.productsClient
            .send({ cmd: 'find_one_product' }, { id })
            .pipe(
                catchError(err => {
                    throw new RpcException(err);
                })
            );

        // try {
        //     const product = await firstValueFrom(
        //         this.productsClient.send({ cmd: 'find_one_product' }, { id })
        //     );
        //     return product;
        // } catch (error) {
        //     throw new RpcException(error);
        // }
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
