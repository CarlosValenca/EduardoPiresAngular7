# Personal Definitions

# App Installs

# ng2-validation
site: https://www.npmjs.com/package/ng2-validation
install: npm install ng2-validation --save
template driven: import { CustomFormsModule } from 'ng2-validation' + adicionar no imports

# ngx-toastr
site: https://www.npmjs.com/package/ngx-toastr
npm install ngx-toastr --save
npm install @angular/animations --save
incluir o arquivo toastr.css no projeto
no angular.json em styles referenciar este arquivo css
site: https://angular.io/guide/animations
copiar do site acima o import abaixo:
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
incluir no app.modules.ts
Incluir tb o import: import { ToastrModule } from 'ngx-toastr'; em app.modules.ts
No inscricao.component.ts importar o toastr

# Degugar o código
Tenha a extensão Debugger for Chrome

#Rodar em produção
ng s --prod

#Pipes Customizados
https://toddmotto.com/angular-pipes-custom-pipes

#Date Picker
npm install mydatepicker --save
https://www.npmjs.com/package/mydatepicker
https://github.com/kekeh/mydatepicker#readme