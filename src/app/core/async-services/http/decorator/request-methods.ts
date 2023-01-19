import { methodBuilder } from '../builder/request-builder';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD'
}

/**
 * GET method
 *
 * @param string url - resource url of the method
 */
export let GET = methodBuilder(RequestMethod.GET);
/**
 * POST method
 *
 * @param string url - resource url of the method
 */
export let POST = methodBuilder(RequestMethod.POST);
/**
 * PUT method
 *
 * @param string url - resource url of the method
 */
export let PUT = methodBuilder(RequestMethod.PUT);
/**
 * DELETE method
 *
 * @param string url - resource url of the method
 */
export let DELETE = methodBuilder(RequestMethod.DELETE);
/**
 * HEAD method
 *
 * @param string url - resource url of the method
 */
export let HEAD = methodBuilder(RequestMethod.HEAD);
