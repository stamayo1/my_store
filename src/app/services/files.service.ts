import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {saveAs} from 'file-saver'; 

import {environment} from '../../environments/environment';
import { tap, map} from 'rxjs/operators'; 
import { File } from '../models/files.model';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = `${environment.API_URL}/api/files`;

  constructor(
    private client: HttpClient
  ) { }


  getFile(name_file: string, url: string, type: string){
    /** 
     * :param name: nombre del archivo
     * :param url: ruta local o remota donde esta el archivo
     * :param type: formato del documento a descargar
     * blob: objeto de tipo fichero de datos planos inmutables
    */

    return this.client.get(url, {responseType: 'blob'})
    .pipe(
      tap( content => {
        const blob = new Blob([content], {type}); 
        saveAs(blob, name_file);
      }), 
      map(() => true)
    )
  }

  uploadFile(file: Blob){
    const dto = new FormData(); 
    dto.append('file', file); 
    return this.client.post<File>(`${this.apiUrl}/upload`, dto,
    // { 
    //   header: {
    //     'Content-type': "multipart/form-data"
    //   }}
    )
  }
}
