import { Http, Headers, Response } from '@angular/http';
import { GumgaAutorizadorService } from '../gumga-autorizador.service';

export class SuperService {

  protected baseUrl = 'http://23.239.2.85/pedidos-api/api';
  protected collection = '';
  protected http:Http;

  constructor(colecao:string, http: Http, private autorizador:GumgaAutorizadorService) { 
      this.http=http;
      this.collection=colecao;
  }

  errorHandler = error => console.error('CategoriaService error', error);
  
  createAuthorizationHeader():Headers {
    let headers=new Headers();
    headers.append('gumgaToken',this.autorizador.getToken()); 
    return headers;
  }

  add(objeto) {
    return this.http.post(`${this.baseUrl}/${this.collection}`, objeto,{headers:this.createAuthorizationHeader()})
      .toPromise()
      .catch(this.errorHandler);
  }

  getAll():Promise<any> {
    return this.http.get(`${this.baseUrl}/${this.collection}`,{headers:this.createAuthorizationHeader()})
      .toPromise().then(response=>response.json())
      .catch(this.errorHandler);
  }

  getOne(id):Promise<any> {
    return this.http.get(`${this.baseUrl}/${this.collection}/${id}`,{headers:this.createAuthorizationHeader()})
      .toPromise().then(response=>response.json())
      .catch(this.errorHandler);
  }

  newObject():Promise<any> {
    return this.http.get(`${this.baseUrl}/${this.collection}/new`,{headers:this.createAuthorizationHeader()})
      .toPromise().then(response=>response.json())
      .catch(this.errorHandler);
  }

  remove(id) {
    return this.http.delete(`${this.baseUrl}/${this.collection}/${id}`,{headers:this.createAuthorizationHeader()})
      .toPromise().then(response=>response.json())
      .catch(this.errorHandler);
  }

  update(objeto) {
    return this.http.put(`${this.baseUrl}/${this.collection}/${objeto.id}`, objeto,{headers:this.createAuthorizationHeader()})
      .toPromise().then(response=>response.json())
      .catch(this.errorHandler);
  }

  
}
