import type { Schema, Struct } from "@strapi/strapi";

export interface ArticleListItem extends Struct.ComponentSchema {
  collectionName: "components_article_list_items";
  info: {
    description: "";
    displayName: "listItem";
  };
  attributes: {
    link: Schema.Attribute.String;
    style: Schema.Attribute.Enumeration<["none", "disc", "circle", "square", "decimal", "lower-alpha"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"none">;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ArticleSection extends Struct.ComponentSchema {
  collectionName: "components_article_sections";
  info: {
    description: "";
    displayName: "section";
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<"images" | "files" | "videos" | "audios">;
    list: Schema.Attribute.Component<"article.list-item", true>;
    p: Schema.Attribute.RichText & Schema.Attribute.Required;
    subsections: Schema.Attribute.Component<"article.subsection", true>;
  };
}

export interface ArticleSubheading extends Struct.ComponentSchema {
  collectionName: "components_article_subheadings";
  info: {
    description: "";
    displayName: "subheading";
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<"images" | "files" | "videos" | "audios">;
    list: Schema.Attribute.Component<"article.list-item", true>;
    p: Schema.Attribute.RichText;
  };
}

export interface ArticleSubsection extends Struct.ComponentSchema {
  collectionName: "components_article_subsections";
  info: {
    description: "";
    displayName: "subsection";
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    headings: Schema.Attribute.Component<"article.subheading", true>;
    image: Schema.Attribute.Media<"images" | "files" | "videos" | "audios">;
    list: Schema.Attribute.Component<"article.list-item", true>;
    p: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface ProductCartItem extends Struct.ComponentSchema {
  collectionName: "components_user_information_cart_items";
  info: {
    description: "";
    displayName: "cartItem";
  };
  attributes: {
    barcode: Schema.Attribute.String & Schema.Attribute.Required;
    productNumber: Schema.Attribute.BigInteger &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: "0";
        },
        string
      >;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    storeId: Schema.Attribute.BigInteger &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: "0";
        },
        string
      >;
  };
}

export interface ProductLineItem extends Struct.ComponentSchema {
  collectionName: "components_product_line_items";
  info: {
    description: "";
    displayName: "lineItem";
  };
  attributes: {
    barcode: Schema.Attribute.String & Schema.Attribute.Required;
    discount: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    imageUrl: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    productNumber: Schema.Attribute.String & Schema.Attribute.Required;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductOption extends Struct.ComponentSchema {
  collectionName: "components_product_options";
  info: {
    description: "These are the most common product variant options";
    displayName: "option";
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      ["QUANTITY", "WEIGHT", "SIZE", "MATERIAL", "TYPE", "FEATURES", "PACKAGING", "COLOR", "FLAVOR", "SCENT"]
    > &
      Schema.Attribute.Required;
    value: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 25;
        minLength: 1;
      }>;
  };
}

export interface ProductVariant extends Struct.ComponentSchema {
  collectionName: "components_product_variants";
  info: {
    description: "";
    displayName: "variant";
  };
  attributes: {
    barcode: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 25;
        minLength: 5;
      }>;
    comparePrice: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    imageUrl: Schema.Attribute.String;
    options: Schema.Attribute.Component<"product.option", true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 1;
        },
        number
      >;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0.01;
        },
        number
      >;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface UserInformationAddress extends Struct.ComponentSchema {
  collectionName: "components_user_information_addresses";
  info: {
    description: "";
    displayName: "address";
  };
  attributes: {
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    currentLat: Schema.Attribute.Float & Schema.Attribute.Required;
    currentLng: Schema.Attribute.Float & Schema.Attribute.Required;
    line1: Schema.Attribute.String;
    line2: Schema.Attribute.String;
    postalCode: Schema.Attribute.String;
    province: Schema.Attribute.String;
  };
}

export interface UserInformationOpeningHours extends Struct.ComponentSchema {
  collectionName: "components_user_information_opening_hours";
  info: {
    description: "";
    displayName: "workDay";
  };
  attributes: {
    closes: Schema.Attribute.Enumeration<
      [
        "AM-12.00",
        "AM-12.15",
        "AM-12.30",
        "AM-12.45",
        "AM-01.00",
        "AM-01.15",
        "AM-01.30",
        "AM-01.45",
        "AM-02.00",
        "AM-02.15",
        "AM-02.30",
        "AM-02.45",
        "AM-03.00",
        "AM-03.15",
        "AM-03.30",
        "AM-03.45",
        "AM-04.00",
        "AM-04.15",
        "AM-04.30",
        "AM-04.45",
        "AM-05.00",
        "AM-05.15",
        "AM-05.30",
        "AM-05.45",
        "AM-06.00",
        "AM-06.15",
        "AM-06.30",
        "AM-06.45",
        "AM-07.00",
        "AM-07.15",
        "AM-07.30",
        "AM-07.45",
        "AM-08.00",
        "AM-08.15",
        "AM-08.30",
        "AM-08.45",
        "AM-09.00",
        "AM-09.15",
        "AM-09.30",
        "AM-09.45",
        "AM-10.00",
        "AM-10.15",
        "AM-10.30",
        "AM-10.45",
        "AM-11.00",
        "AM-11.15",
        "AM-11.30",
        "AM-11.45",
        "PM-12.00",
        "PM-12.15",
        "PM-12.30",
        "PM-12.45",
        "PM-01.00",
        "PM-01.15",
        "PM-01.30",
        "PM-01.45",
        "PM-02.00",
        "PM-02.15",
        "PM-02.30",
        "PM-02.45",
        "PM-03.00",
        "PM-03.15",
        "PM-03.30",
        "PM-03.45",
        "PM-04.00",
        "PM-04.15",
        "PM-04.30",
        "PM-04.45",
        "PM-05.00",
        "PM-05.15",
        "PM-05.30",
        "PM-05.45",
        "PM-06.00",
        "PM-06.15",
        "PM-06.30",
        "PM-06.45",
        "PM-07.00",
        "PM-07.15",
        "PM-07.30",
        "PM-07.45",
        "PM-08.00",
        "PM-08.15",
        "PM-08.30",
        "PM-08.45",
        "PM-09.00",
        "PM-09.15",
        "PM-09.30",
        "PM-09.45",
        "PM-10.00",
        "PM-10.15",
        "PM-10.30",
        "PM-10.45",
        "PM-11.00",
        "PM-11.15",
        "PM-11.30",
        "PM-11.45",
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"PM-07.00">;
    day: Schema.Attribute.Enumeration<
      ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    > &
      Schema.Attribute.Required;
    opens: Schema.Attribute.Enumeration<
      [
        "AM-12.00",
        "AM-12.15",
        "AM-12.30",
        "AM-12.45",
        "AM-01.00",
        "AM-01.15",
        "AM-01.30",
        "AM-01.45",
        "AM-02.00",
        "AM-02.15",
        "AM-02.30",
        "AM-02.45",
        "AM-03.00",
        "AM-03.15",
        "AM-03.30",
        "AM-03.45",
        "AM-04.00",
        "AM-04.15",
        "AM-04.30",
        "AM-04.45",
        "AM-05.00",
        "AM-05.15",
        "AM-05.30",
        "AM-05.45",
        "AM-06.00",
        "AM-06.15",
        "AM-06.30",
        "AM-06.45",
        "AM-07.00",
        "AM-07.15",
        "AM-07.30",
        "AM-07.45",
        "AM-08.00",
        "AM-08.15",
        "AM-08.30",
        "AM-08.45",
        "AM-09.00",
        "AM-09.15",
        "AM-09.30",
        "AM-09.45",
        "AM-10.00",
        "AM-10.15",
        "AM-10.30",
        "AM-10.45",
        "AM-11.00",
        "AM-11.15",
        "AM-11.30",
        "AM-11.45",
        "PM-12.00",
        "PM-12.15",
        "PM-12.30",
        "PM-12.45",
        "PM-01.00",
        "PM-01.15",
        "PM-01.30",
        "PM-01.45",
        "PM-02.00",
        "PM-02.15",
        "PM-02.30",
        "PM-02.45",
        "PM-03.00",
        "PM-03.15",
        "PM-03.30",
        "PM-03.45",
        "PM-04.00",
        "PM-04.15",
        "PM-04.30",
        "PM-04.45",
        "PM-05.00",
        "PM-05.15",
        "PM-05.30",
        "PM-05.45",
        "PM-06.00",
        "PM-06.15",
        "PM-06.30",
        "PM-06.45",
        "PM-07.00",
        "PM-07.15",
        "PM-07.30",
        "PM-07.45",
        "PM-08.00",
        "PM-08.15",
        "PM-08.30",
        "PM-08.45",
        "PM-09.00",
        "PM-09.15",
        "PM-09.30",
        "PM-09.45",
        "PM-10.00",
        "PM-10.15",
        "PM-10.30",
        "PM-10.45",
        "PM-11.00",
        "PM-11.15",
        "PM-11.30",
        "PM-11.45",
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"AM-07.00">;
  };
}

export interface UserInformationPaymentMethod extends Struct.ComponentSchema {
  collectionName: "components_user_information_payment_methods";
  info: {
    description: "";
    displayName: "paymentMethod";
  };
  attributes: {
    meta: Schema.Attribute.JSON;
    method: Schema.Attribute.Enumeration<["CASH", "CARD", "BANK"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"CASH">;
    type: Schema.Attribute.Enumeration<["ON-DELIVERY", "ONLINE"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"ON-DELIVERY">;
  };
}

export interface UserInformationWarning extends Struct.ComponentSchema {
  collectionName: "components_user_information_warnings";
  info: {
    description: "";
    displayName: "warning";
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.Required & Schema.Attribute.DefaultTo<true>;
    message: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "article.list-item": ArticleListItem;
      "article.section": ArticleSection;
      "article.subheading": ArticleSubheading;
      "article.subsection": ArticleSubsection;
      "product.cart-item": ProductCartItem;
      "product.line-item": ProductLineItem;
      "product.option": ProductOption;
      "product.variant": ProductVariant;
      "user-information.address": UserInformationAddress;
      "user-information.opening-hours": UserInformationOpeningHours;
      "user-information.payment-method": UserInformationPaymentMethod;
      "user-information.warning": UserInformationWarning;
    }
  }
}
