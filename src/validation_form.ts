import Control from './common/control';
interface IUserDataErrors {
  name: string;
  isActive: string;
}

class App extends Control{
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const button = new Control(this.node, 'button', '', 'Validation');
    button.node.onclick = () => {
      this.showForm().then(()=>console.log('close form'))
    }
  }

  showForm():Promise<void> {
    return new Promise((resolve) => {
      const userModel = new UserFormModel(new UserData('', false));
      userModel.load().then(() => {
        const userController = new UserFormController(userModel, () => {
          userForm.destroy();
          resolve();
        });
        const userForm = new UserForm(this.node, userModel, userController);
      })  
    })
  }
}

class UserForm extends Control{
  text: Control<HTMLInputElement>;
  check1: Control<HTMLInputElement>;
  textError: Control<HTMLElement>;

 constructor(parentNode: HTMLElement, model:UserFormModel, controller: UserFormController) {
   super(parentNode);

   model.onUpdate = () => {
     this.update(model);
   }

   this.text = new Control<HTMLInputElement>(this.node, 'input', '', '');
   this.textError = new Control(this.node, 'div', '', '');

   this.check1 = new Control<HTMLInputElement>(this.node, 'input');
   this.check1.node.type = 'checkbox';

   const button1 = new Control(this.node, 'button', '', 'submit');
   const button2 = new Control(this.node, 'button', '', 'cancel');

   button1.node.onclick = async () => controller.validate(this.getData());

   button2.node.onclick = () => controller.cancel();

   this.update(model);
 }
  
  setErrors(result: IUserDataErrors) {
    this.textError.node.textContent = result.name;
  }
  
  getData() {
    return new UserData(this.text.node.value, this.check1.node.checked);
  }

  update(model:UserFormModel) {
    this.setErrors(model.errors);
    this.setData(model.data);
  }

  setData(data:UserData) {
    this.text.node.value = data.name;
    this.check1.node.checked = data.isActive;
  }
}

class UserData{
  name: string;
  isActive: boolean;
  
  constructor(name:string, isActive:boolean) {
    this.name = name;
    this.isActive = isActive;
  }
}

function checkData(data:UserData):Promise<IUserDataErrors>{
  return Promise.resolve({
    name: data.name.length > 1 ? '' : 'Error',
    isActive: '',
  })
}

class UserFormController {
  model: UserFormModel;
  private onClose: () => void;

  constructor(model:UserFormModel, onClose:()=>void) {
    this.model = model;
    this.onClose = onClose;
  }

  async validate(data:UserData) {
    const result = await checkData(data);

    this.model.errors = result;
    const isOk = !Object.values(result).find((item) => item != "");
    if (isOk) {
      //server
      console.log('submit');
      this.onClose();
    }
  }

  cancel() {
    console.log('cancel');
    this.onClose();
  }
}

class UserFormModel{
  private _errors: IUserDataErrors;
  private _data: UserData;
  onUpdate: () => void;

  constructor(initialData:UserData) {
    this._data = initialData;
    this._errors = {
      name: '',
      isActive: ''
    }
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
    this.onUpdate && this.onUpdate();
  }

  get errors() {
    return this._errors;
  }

  set errors(value) {
    this._errors = value;
    this.onUpdate && this.onUpdate();
  }
  
  async load() {
    const result = await getServerData();
    this.data = result;
  }
}

function getServerData() {
  return new Promise<UserData>((resolve) => {
    setTimeout(() => resolve(new UserData('ggg', true)), 1000);
  })  
}

new App(document.body);