import type { Schema, Attribute } from '@strapi/strapi';

export interface ArticleListItem extends Schema.Component {
  collectionName: 'components_article_list_items';
  info: {
    displayName: 'listItem';
    description: '';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    link: Attribute.String;
    style: Attribute.Enumeration<
      ['none', 'disc', 'circle', 'square', 'decimal', 'lower-alpha']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'none'>;
  };
}

export interface ArticleSection extends Schema.Component {
  collectionName: 'components_article_sections';
  info: {
    displayName: 'section';
    description: '';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    image: Attribute.Media;
    p: Attribute.RichText & Attribute.Required;
    list: Attribute.Component<'article.list-item', true>;
    subsections: Attribute.Component<'article.subsection', true>;
  };
}

export interface ArticleSubheading extends Schema.Component {
  collectionName: 'components_article_subheadings';
  info: {
    displayName: 'subheading';
    description: '';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    image: Attribute.Media;
    p: Attribute.RichText;
    list: Attribute.Component<'article.list-item', true>;
  };
}

export interface ArticleSubsection extends Schema.Component {
  collectionName: 'components_article_subsections';
  info: {
    displayName: 'subsection';
    description: '';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    p: Attribute.RichText & Attribute.Required;
    image: Attribute.Media;
    list: Attribute.Component<'article.list-item', true>;
    headings: Attribute.Component<'article.subheading', true>;
  };
}

export interface ProductCartItem extends Schema.Component {
  collectionName: 'components_user_information_cart_items';
  info: {
    displayName: 'cartItem';
    description: '';
  };
  attributes: {
    storeId: Attribute.BigInteger &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: '0';
        },
        string
      >;
    productNumber: Attribute.BigInteger &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: '0';
        },
        string
      >;
    barcode: Attribute.String & Attribute.Required;
    quantity: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<1>;
  };
}

export interface ProductLineItem extends Schema.Component {
  collectionName: 'components_product_line_items';
  info: {
    displayName: 'lineItem';
    description: '';
  };
  attributes: {
    productNumber: Attribute.String & Attribute.Required;
    barcode: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    quantity: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    discount: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    imageUrl: Attribute.String & Attribute.Required;
  };
}

export interface ProductOption extends Schema.Component {
  collectionName: 'components_product_options';
  info: {
    displayName: 'option';
    description: 'These are the most common product variant options';
  };
  attributes: {
    name: Attribute.Enumeration<
      [
        'QUANTITY',
        'WEIGHT',
        'SIZE',
        'MATERIAL',
        'TYPE',
        'FEATURES',
        'PACKAGING',
        'COLOR',
        'FLAVOR',
        'SCENT'
      ]
    > &
      Attribute.Required;
    value: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
        maxLength: 25;
      }>;
  };
}

export interface ProductVariant extends Schema.Component {
  collectionName: 'components_product_variants';
  info: {
    displayName: 'variant';
    description: '';
  };
  attributes: {
    barcode: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 5;
        maxLength: 25;
      }>;
    imageUrl: Attribute.String;
    comparePrice: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0.01;
        },
        number
      >;
    quantity: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    options: Attribute.Component<'product.option', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 3;
        },
        number
      >;
  };
}

export interface UserInformationAddress extends Schema.Component {
  collectionName: 'components_user_information_addresses';
  info: {
    displayName: 'address';
    description: '';
  };
  attributes: {
    line1: Attribute.String;
    line2: Attribute.String;
    city: Attribute.String;
    postalCode: Attribute.String;
    province: Attribute.String;
    country: Attribute.String;
    currentLat: Attribute.Float & Attribute.Required;
    currentLng: Attribute.Float & Attribute.Required;
  };
}

export interface UserInformationOpeningHours extends Schema.Component {
  collectionName: 'components_user_information_opening_hours';
  info: {
    displayName: 'workDay';
    description: '';
  };
  attributes: {
    day: Attribute.Enumeration<
      [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ]
    > &
      Attribute.Required;
    opens: Attribute.Enumeration<
      [
        'AM-12.00',
        'AM-12.15',
        'AM-12.30',
        'AM-12.45',
        'AM-01.00',
        'AM-01.15',
        'AM-01.30',
        'AM-01.45',
        'AM-02.00',
        'AM-02.15',
        'AM-02.30',
        'AM-02.45',
        'AM-03.00',
        'AM-03.15',
        'AM-03.30',
        'AM-03.45',
        'AM-04.00',
        'AM-04.15',
        'AM-04.30',
        'AM-04.45',
        'AM-05.00',
        'AM-05.15',
        'AM-05.30',
        'AM-05.45',
        'AM-06.00',
        'AM-06.15',
        'AM-06.30',
        'AM-06.45',
        'AM-07.00',
        'AM-07.15',
        'AM-07.30',
        'AM-07.45',
        'AM-08.00',
        'AM-08.15',
        'AM-08.30',
        'AM-08.45',
        'AM-09.00',
        'AM-09.15',
        'AM-09.30',
        'AM-09.45',
        'AM-10.00',
        'AM-10.15',
        'AM-10.30',
        'AM-10.45',
        'AM-11.00',
        'AM-11.15',
        'AM-11.30',
        'AM-11.45',
        'PM-12.00',
        'PM-12.15',
        'PM-12.30',
        'PM-12.45',
        'PM-01.00',
        'PM-01.15',
        'PM-01.30',
        'PM-01.45',
        'PM-02.00',
        'PM-02.15',
        'PM-02.30',
        'PM-02.45',
        'PM-03.00',
        'PM-03.15',
        'PM-03.30',
        'PM-03.45',
        'PM-04.00',
        'PM-04.15',
        'PM-04.30',
        'PM-04.45',
        'PM-05.00',
        'PM-05.15',
        'PM-05.30',
        'PM-05.45',
        'PM-06.00',
        'PM-06.15',
        'PM-06.30',
        'PM-06.45',
        'PM-07.00',
        'PM-07.15',
        'PM-07.30',
        'PM-07.45',
        'PM-08.00',
        'PM-08.15',
        'PM-08.30',
        'PM-08.45',
        'PM-09.00',
        'PM-09.15',
        'PM-09.30',
        'PM-09.45',
        'PM-10.00',
        'PM-10.15',
        'PM-10.30',
        'PM-10.45',
        'PM-11.00',
        'PM-11.15',
        'PM-11.30',
        'PM-11.45'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'AM-07.00'>;
    closes: Attribute.Enumeration<
      [
        'AM-12.00',
        'AM-12.15',
        'AM-12.30',
        'AM-12.45',
        'AM-01.00',
        'AM-01.15',
        'AM-01.30',
        'AM-01.45',
        'AM-02.00',
        'AM-02.15',
        'AM-02.30',
        'AM-02.45',
        'AM-03.00',
        'AM-03.15',
        'AM-03.30',
        'AM-03.45',
        'AM-04.00',
        'AM-04.15',
        'AM-04.30',
        'AM-04.45',
        'AM-05.00',
        'AM-05.15',
        'AM-05.30',
        'AM-05.45',
        'AM-06.00',
        'AM-06.15',
        'AM-06.30',
        'AM-06.45',
        'AM-07.00',
        'AM-07.15',
        'AM-07.30',
        'AM-07.45',
        'AM-08.00',
        'AM-08.15',
        'AM-08.30',
        'AM-08.45',
        'AM-09.00',
        'AM-09.15',
        'AM-09.30',
        'AM-09.45',
        'AM-10.00',
        'AM-10.15',
        'AM-10.30',
        'AM-10.45',
        'AM-11.00',
        'AM-11.15',
        'AM-11.30',
        'AM-11.45',
        'PM-12.00',
        'PM-12.15',
        'PM-12.30',
        'PM-12.45',
        'PM-01.00',
        'PM-01.15',
        'PM-01.30',
        'PM-01.45',
        'PM-02.00',
        'PM-02.15',
        'PM-02.30',
        'PM-02.45',
        'PM-03.00',
        'PM-03.15',
        'PM-03.30',
        'PM-03.45',
        'PM-04.00',
        'PM-04.15',
        'PM-04.30',
        'PM-04.45',
        'PM-05.00',
        'PM-05.15',
        'PM-05.30',
        'PM-05.45',
        'PM-06.00',
        'PM-06.15',
        'PM-06.30',
        'PM-06.45',
        'PM-07.00',
        'PM-07.15',
        'PM-07.30',
        'PM-07.45',
        'PM-08.00',
        'PM-08.15',
        'PM-08.30',
        'PM-08.45',
        'PM-09.00',
        'PM-09.15',
        'PM-09.30',
        'PM-09.45',
        'PM-10.00',
        'PM-10.15',
        'PM-10.30',
        'PM-10.45',
        'PM-11.00',
        'PM-11.15',
        'PM-11.30',
        'PM-11.45'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'PM-07.00'>;
  };
}

export interface UserInformationPaymentMethod extends Schema.Component {
  collectionName: 'components_user_information_payment_methods';
  info: {
    displayName: 'paymentMethod';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['ON-DELIVERY', 'ONLINE']> &
      Attribute.Required &
      Attribute.DefaultTo<'ON-DELIVERY'>;
    method: Attribute.Enumeration<['CASH', 'CARD', 'BANK']> &
      Attribute.Required &
      Attribute.DefaultTo<'CASH'>;
    meta: Attribute.JSON;
  };
}

export interface UserInformationWarning extends Schema.Component {
  collectionName: 'components_user_information_warnings';
  info: {
    displayName: 'warning';
    description: '';
  };
  attributes: {
    message: Attribute.String &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    active: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'article.list-item': ArticleListItem;
      'article.section': ArticleSection;
      'article.subheading': ArticleSubheading;
      'article.subsection': ArticleSubsection;
      'product.cart-item': ProductCartItem;
      'product.line-item': ProductLineItem;
      'product.option': ProductOption;
      'product.variant': ProductVariant;
      'user-information.address': UserInformationAddress;
      'user-information.opening-hours': UserInformationOpeningHours;
      'user-information.payment-method': UserInformationPaymentMethod;
      'user-information.warning': UserInformationWarning;
    }
  }
}
