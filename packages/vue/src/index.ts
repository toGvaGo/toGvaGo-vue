
export * from '@guide-togvago-vue/runtime-dom';


import { baseCompile } from '@guide-togvago-vue/compiler-core';
import * as runtimeDom from '@guide-togvago-vue/runtime-dom';
import { registerRuntimeCompiler } from '@guide-togvago-vue/runtime-dom';

function compileToFunction(template) {
    const { code } = baseCompile(template)
    const render = new Function('Vue', code)(runtimeDom)

    return render
}

registerRuntimeCompiler(compileToFunction);