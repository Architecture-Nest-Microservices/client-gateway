import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
    constructor() {}

    @Post()
    createProduct() {
        return 'Product created';
    }

    @Get()
    findAllProducts() {
        return 'All products';
    }

    @Get(':id')
    findProductById(@Param('id') id: string) {
        return 'Product by id';
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
