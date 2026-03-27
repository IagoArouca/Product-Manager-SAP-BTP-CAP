// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './../..';
import * as __ from './../../_';
import * as _sap_common from './../../sap/common';

export function _ProductAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Product extends _._cuidAspect(_._managedAspect(Base)) {
    declare identifier?: string | null
    declare name?: string | null
    declare description?: string | null
    declare imageURL?: string | null
    declare price?: number | null
    /**
    * Type for an association to Currencies
    * 
    * See https://cap.cloud.sap/docs/cds/common#type-currency
    */
    declare currency?: _.Currency | null
    declare currency_code?: string | null
    declare stock?: number | null
    declare stockCriticality?: number | null
    declare category?: __.Association.to<Category> | null
    declare category_ID?: number | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Product> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Product>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Product extends _ProductAspect(__.Entity) {}
Object.defineProperty(Product, 'name', { value: 'app.products.Products' })
Object.defineProperty(Product, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Products extends Array<Product> {$count?: number}
Object.defineProperty(Products, 'name', { value: 'app.products.Products' })

export function _CategoryAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Category extends _sap_common._CodeListAspect(Base) {
    declare ID?: __.Key<number>
    declare texts?: __.Composition.of.many<Categories.texts>
    declare localized?: __.Association.to<Categories.text> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Category>;
    declare static readonly elements: __.ElementsOf<Category>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class Category extends _CategoryAspect(__.Entity) {}
Object.defineProperty(Category, 'name', { value: 'app.products.Categories' })
Object.defineProperty(Category, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class Categories extends Array<Category> {$count?: number}
Object.defineProperty(Categories, 'name', { value: 'app.products.Categories' })

export function _OrderAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Order extends _._cuidAspect(_._managedAspect(Base)) {
    declare orderNo?: string | null
    declare customerName?: __.Association.to<Customer> | null
    declare customerName_ID?: string | null
    declare totalAmount?: number | null
    /**
    * Type for an association to Currencies
    * 
    * See https://cap.cloud.sap/docs/cds/common#type-currency
    */
    declare currency?: _.Currency | null
    declare currency_code?: string | null
    declare status?: string | null
    declare statusCriticality?: number | null
    declare items?: __.Composition.of.many<OrderItems>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Order> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Order>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & {
      finalizeOrder:  {
        // positional
        (): any
        // named
        ({}: globalThis.Record<never, never>): any
        // metadata (do not use)
        __parameters: globalThis.Record<never, never>, __returns: any, __self: Order
        kind: 'action'
      }
      cancelFinalization:  {
        // positional
        (): any
        // named
        ({}: globalThis.Record<never, never>): any
        // metadata (do not use)
        __parameters: globalThis.Record<never, never>, __returns: any, __self: Order
        kind: 'action'
      }
    };
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Order extends _OrderAspect(__.Entity) {}
Object.defineProperty(Order, 'name', { value: 'app.products.Orders' })
Object.defineProperty(Order, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Orders extends Array<Order> {$count?: number}
Object.defineProperty(Orders, 'name', { value: 'app.products.Orders' })

export function _OrderItemAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class OrderItem extends _._cuidAspect(_._managedAspect(Base)) {
    declare parent?: __.Association.to<Order> | null
    declare parent_ID?: string | null
    declare product?: __.Association.to<Product> | null
    declare product_ID?: string | null
    declare quantity?: number | null
    declare itemPrice?: number | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<OrderItem> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<OrderItem>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class OrderItem extends _OrderItemAspect(__.Entity) {}
Object.defineProperty(OrderItem, 'name', { value: 'app.products.OrderItems' })
Object.defineProperty(OrderItem, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class OrderItems extends Array<OrderItem> {$count?: number}
Object.defineProperty(OrderItems, 'name', { value: 'app.products.OrderItems' })

export function _CustomerAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Customer extends _._cuidAspect(_._managedAspect(Base)) {
    declare name?: string | null
    declare cpf?: string | null
    declare email?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Customer> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Customer>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Customer extends _CustomerAspect(__.Entity) {}
Object.defineProperty(Customer, 'name', { value: 'app.products.Customers' })
Object.defineProperty(Customer, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Customers extends Array<Customer> {$count?: number}
Object.defineProperty(Customers, 'name', { value: 'app.products.Customers' })

export namespace Categories {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends _sap_common._TextsAspectAspect(Base) {
      declare descr?: string | null
      declare ID?: __.Key<number>
      static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text> & typeof _sap_common.TextsAspect.keys;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: typeof _sap_common.TextsAspect.actions & globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'app.products.Categories.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'app.products.Categories.texts' })
  
}