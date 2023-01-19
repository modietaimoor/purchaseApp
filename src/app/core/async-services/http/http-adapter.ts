import { HttpResponse } from '@angular/common/http';

export class HttpAdapter {
  static baseAdapter(res: HttpResponse<unknown>): unknown {
    if (res.status === 200 || res.status === 201) {
      try {
        return res.body;
      } catch (e) {
        return res;
      }
    }
    return {};
  }
}
