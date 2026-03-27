// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './..';
import * as __ from './../_';
import * as _sap_common from './../sap/common';

export default class {
}

export function _OrderAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Order extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
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
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Order>;
    declare static readonly elements: __.ElementsOf<Order>;
    declare static readonly actions: {
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
export class Order extends _OrderAspect(__.Entity) {static drafts: __.DraftOf<Order>}
Object.defineProperty(Order, 'name', { value: 'ProductService.Orders' })
Object.defineProperty(Order, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Orders extends Array<Order> {static drafts: __.DraftsOf<Order>
$count?: number}
Object.defineProperty(Orders, 'name', { value: 'ProductService.Orders' })

export function _OrderItemAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class OrderItem extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare parent?: __.Association.to<Order> | null
    declare parent_ID?: string | null
    declare product?: __.Association.to<Product> | null
    declare product_ID?: string | null
    declare quantity?: number | null
    declare itemPrice?: number | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<OrderItem>;
    declare static readonly elements: __.ElementsOf<OrderItem>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class OrderItem extends _OrderItemAspect(__.Entity) {static drafts: __.DraftOf<OrderItem>}
Object.defineProperty(OrderItem, 'name', { value: 'ProductService.OrderItems' })
Object.defineProperty(OrderItem, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class OrderItems extends Array<OrderItem> {static drafts: __.DraftsOf<OrderItem>
$count?: number}
Object.defineProperty(OrderItems, 'name', { value: 'ProductService.OrderItems' })

export function _ProductAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Product extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
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
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Product>;
    declare static readonly elements: __.ElementsOf<Product>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Product extends _ProductAspect(__.Entity) {static drafts: __.DraftOf<Product>}
Object.defineProperty(Product, 'name', { value: 'ProductService.Products' })
Object.defineProperty(Product, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Products extends Array<Product> {static drafts: __.DraftsOf<Product>
$count?: number}
Object.defineProperty(Products, 'name', { value: 'ProductService.Products' })

export function _CategoryAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Category extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare ID?: __.Key<number>
    declare texts?: __.Composition.of.many<Categories.texts>
    declare localized?: __.Association.to<Categories.text> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Category>;
    declare static readonly elements: __.ElementsOf<Category>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class Category extends _CategoryAspect(__.Entity) {}
Object.defineProperty(Category, 'name', { value: 'ProductService.Categories' })
Object.defineProperty(Category, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class Categories extends Array<Category> {$count?: number}
Object.defineProperty(Categories, 'name', { value: 'ProductService.Categories' })

export function _CustomerAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Customer extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare name?: string | null
    declare cpf?: string | null
    declare email?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Customer>;
    declare static readonly elements: __.ElementsOf<Customer>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Customer extends _CustomerAspect(__.Entity) {static drafts: __.DraftOf<Customer>}
Object.defineProperty(Customer, 'name', { value: 'ProductService.Customers' })
Object.defineProperty(Customer, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Customers extends Array<Customer> {static drafts: __.DraftsOf<Customer>
$count?: number}
Object.defineProperty(Customers, 'name', { value: 'ProductService.Customers' })

export function _CurrencyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Currency extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<string>
    declare symbol?: string | null
    declare minorUnit?: number | null
    declare texts?: __.Composition.of.many<Currencies.texts>
    declare localized?: __.Association.to<Currencies.text> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Currency>;
    declare static readonly elements: __.ElementsOf<Currency>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Code list for currencies
* 
* See https://cap.cloud.sap/docs/cds/common#entity-currencies
*/
export class Currency extends _CurrencyAspect(__.Entity) {}
Object.defineProperty(Currency, 'name', { value: 'ProductService.Currencies' })
Object.defineProperty(Currency, 'is_singular', { value: true })
/**
* Code list for currencies
* 
* See https://cap.cloud.sap/docs/cds/common#entity-currencies
*/
export class Currencies extends Array<Currency> {$count?: number}
Object.defineProperty(Currencies, 'name', { value: 'ProductService.Currencies' })

export namespace Categories {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends Base {
      /** Type for a language code */
      declare locale?: __.Key<_sap_common.Locale>
      declare descr?: string | null
      declare ID?: __.Key<number>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text>;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'ProductService.Categories.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'ProductService.Categories.texts' })
  
}
export namespace Currencies {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends Base {
      /** Type for a language code */
      declare locale?: __.Key<_sap_common.Locale>
      declare name?: string | null
      declare descr?: string | null
      declare code?: __.Key<string>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text>;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'ProductService.Currencies.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'ProductService.Currencies.texts' })
  
}