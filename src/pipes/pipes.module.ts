import { NgModule } from '@angular/core';
import { TrimPathPipe } from './trim-path/trim-path';
@NgModule({
	declarations: [TrimPathPipe,
    TrimPathPipe],
	imports: [],
	exports: [TrimPathPipe,
    TrimPathPipe]
})
export class PipesModule {}
