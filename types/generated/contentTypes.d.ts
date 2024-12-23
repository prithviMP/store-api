import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    addresses: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::address.address'
    >;
    wishlist: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::wishlist.wishlist'
    >;
    orders: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::order-detail.order-detail'
    >;
    cart: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::cart.cart'
    >;
    userType: Attribute.Enumeration<['admin', 'normal']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAddressAddress extends Schema.CollectionType {
  collectionName: 'addresses';
  info: {
    singularName: 'address';
    pluralName: 'addresses';
    displayName: 'Address';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    addressLine1: Attribute.String & Attribute.Required;
    addressLine2: Attribute.String;
    country: Attribute.String & Attribute.Required;
    city: Attribute.String & Attribute.Required;
    postalCode: Attribute.String & Attribute.Required;
    landmark: Attribute.String;
    phoneNumber: Attribute.String;
    user: Attribute.Relation<
      'api::address.address',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    ratingsCount: Attribute.String;
    rating: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAuthSendOtp extends Schema.CollectionType {
  collectionName: 'send_otps';
  info: {
    singularName: 'send-otp';
    pluralName: 'send-otps';
    displayName: 'Send OTP';
  };
  attributes: {
    phoneNumber: Attribute.String;
    otp: Attribute.Integer;
    expiry: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::auth.send-otp',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::auth.send-otp',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCartCart extends Schema.CollectionType {
  collectionName: 'carts';
  info: {
    singularName: 'cart';
    pluralName: 'carts';
    displayName: 'Cart';
    description: 'Shopping cart for users';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    total: Attribute.Decimal &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    cartItems: Attribute.Relation<
      'api::cart.cart',
      'oneToMany',
      'api::cart-item.cart-item'
    >;
    users_permissions_user: Attribute.Relation<
      'api::cart.cart',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdBy: Attribute.Relation<'api::cart.cart', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::cart.cart', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiCartItemCartItem extends Schema.CollectionType {
  collectionName: 'cart_items';
  info: {
    singularName: 'cart-item';
    pluralName: 'cart-items';
    displayName: 'Cart Item';
    description: "Individual items in a user's shopping cart";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    cart: Attribute.Relation<
      'api::cart-item.cart-item',
      'manyToOne',
      'api::cart.cart'
    >;
    product: Attribute.Relation<
      'api::cart-item.cart-item',
      'manyToOne',
      'api::product.product'
    >;
    productSku: Attribute.Relation<
      'api::cart-item.cart-item',
      'manyToOne',
      'api::product-sku.product-sku'
    >;
    quantity: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    createdBy: Attribute.Relation<
      'api::cart-item.cart-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cart-item.cart-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: 'Product categories';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text;
    subCategories: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::subcategory.subcategory'
    >;
    cover: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    isThisPopularCategory: Attribute.Boolean;
    products: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomeBannerHomeBanner extends Schema.CollectionType {
  collectionName: 'home_banners';
  info: {
    singularName: 'home-banner';
    pluralName: 'home-banners';
    displayName: 'homeBanner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bannerImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-banner.home-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-banner.home-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInternationlUserInternationlUser
  extends Schema.CollectionType {
  collectionName: 'internationl_users';
  info: {
    singularName: 'internationl-user';
    pluralName: 'internationl-users';
    displayName: 'Internationl_user';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    user_details: Attribute.Relation<
      'api::internationl-user.internationl-user',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    cart: Attribute.Relation<
      'api::internationl-user.internationl-user',
      'oneToOne',
      'api::cart.cart'
    >;
    loaction: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::internationl-user.internationl-user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::internationl-user.internationl-user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMaxDeliveryChargeMaxDeliveryCharge
  extends Schema.CollectionType {
  collectionName: 'max_delivery_charges';
  info: {
    singularName: 'max-delivery-charge';
    pluralName: 'max-delivery-charges';
    displayName: 'set_max_delivery_charge';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    max_delivery_charge: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::max-delivery-charge.max-delivery-charge',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::max-delivery-charge.max-delivery-charge',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderDetailOrderDetail extends Schema.CollectionType {
  collectionName: 'order_details';
  info: {
    singularName: 'order-detail';
    pluralName: 'order-details';
    displayName: 'Order Detail';
    description: 'Details of customer orders';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    orderItems: Attribute.Relation<
      'api::order-detail.order-detail',
      'oneToMany',
      'api::order-item.order-item'
    >;
    total: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    status: Attribute.Enumeration<
      ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    > &
      Attribute.DefaultTo<'pending'>;
    shippingAddress: Attribute.Relation<
      'api::order-detail.order-detail',
      'oneToOne',
      'api::address.address'
    >;
    paymentDetail: Attribute.Relation<
      'api::order-detail.order-detail',
      'oneToOne',
      'api::payment-detail.payment-detail'
    >;
    user: Attribute.Relation<
      'api::order-detail.order-detail',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    razorpayOrderId: Attribute.Text;
    razorpayPaymentId: Attribute.Text;
    razorpaySignature: Attribute.Text;
    createdBy: Attribute.Relation<
      'api::order-detail.order-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order-detail.order-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderItemOrderItem extends Schema.CollectionType {
  collectionName: 'order_items';
  info: {
    singularName: 'order-item';
    pluralName: 'order-items';
    displayName: 'Order Item';
    description: 'Individual items within an order';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    orderDetail: Attribute.Relation<
      'api::order-item.order-item',
      'manyToOne',
      'api::order-detail.order-detail'
    >;
    product: Attribute.Relation<
      'api::order-item.order-item',
      'manyToOne',
      'api::product.product'
    >;
    productSku: Attribute.Relation<
      'api::order-item.order-item',
      'manyToOne',
      'api::product-sku.product-sku'
    >;
    quantity: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    subtotal: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    createdBy: Attribute.Relation<
      'api::order-item.order-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order-item.order-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaymentDetailPaymentDetail extends Schema.CollectionType {
  collectionName: 'payment_details';
  info: {
    singularName: 'payment-detail';
    pluralName: 'payment-details';
    displayName: 'Payment Detail';
    description: 'Details of payments associated with orders';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    orderDetail: Attribute.Relation<
      'api::payment-detail.payment-detail',
      'oneToOne',
      'api::order-detail.order-detail'
    >;
    amount: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    status: Attribute.Enumeration<
      ['pending', 'completed', 'failed', 'refunded']
    > &
      Attribute.DefaultTo<'pending'>;
    paymentDate: Attribute.DateTime;
    razorpay_order_id: Attribute.String;
    razorpay_payment_id: Attribute.String;
    razorpay_signature: Attribute.String;
    createdBy: Attribute.Relation<
      'api::payment-detail.payment-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment-detail.payment-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
    description: 'Product information for the e-commerce platform';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    summary: Attribute.Text;
    price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    cover: Attribute.Media<'images', true> & Attribute.Required;
    categories: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::category.category'
    >;
    subCategories: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::subcategory.subcategory'
    >;
    productAttributes: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::product-attribute.product-attribute'
    >;
    slug: Attribute.UID<'api::product.product', 'name'>;
    ratingsCount: Attribute.String;
    rating: Attribute.Integer;
    topReview: Attribute.Text;
    demoVideo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    wishlist_items: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::wishlist-item.wishlist-item'
    >;
    description: Attribute.Blocks;
    delivery_charge: Attribute.String;
    productDemoVideo: Attribute.Text;
    related_products: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::product.product'
    >;
    order_items: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::order-item.order-item'
    >;
    productSkus: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'api::product-sku.product-sku'
    >;
    internationalPrice: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductAttributeProductAttribute
  extends Schema.CollectionType {
  collectionName: 'product_attributes';
  info: {
    singularName: 'product-attribute';
    pluralName: 'product-attributes';
    displayName: 'Product Attribute';
    description: 'Attributes for product variations such as color and size';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  attributes: {
    type: Attribute.Enumeration<['color', 'size']> & Attribute.Required;
    value: Attribute.String & Attribute.Required;
    product: Attribute.Relation<
      'api::product-attribute.product-attribute',
      'manyToOne',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-attribute.product-attribute',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-attribute.product-attribute',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductSkuProductSku extends Schema.CollectionType {
  collectionName: 'product_skus';
  info: {
    singularName: 'product-sku';
    pluralName: 'product-skus';
    displayName: 'Product SKU';
    description: 'Stock Keeping Units for product variations';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    sku: Attribute.String & Attribute.Required & Attribute.Unique;
    product: Attribute.Relation<
      'api::product-sku.product-sku',
      'oneToOne',
      'api::product.product'
    >;
    quantity: Attribute.Integer;
    order_items: Attribute.Relation<
      'api::product-sku.product-sku',
      'oneToMany',
      'api::order-item.order-item'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-sku.product-sku',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-sku.product-sku',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubcategorySubcategory extends Schema.CollectionType {
  collectionName: 'subcategories';
  info: {
    singularName: 'subcategory';
    pluralName: 'subcategories';
    displayName: 'Subcategory';
    description: 'Subcategories for products';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text;
    parentCategory: Attribute.Relation<
      'api::subcategory.subcategory',
      'manyToOne',
      'api::category.category'
    >;
    products: Attribute.Relation<
      'api::subcategory.subcategory',
      'manyToMany',
      'api::product.product'
    >;
    cover: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subcategory.subcategory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::subcategory.subcategory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWishlistWishlist extends Schema.CollectionType {
  collectionName: 'wishlists';
  info: {
    singularName: 'wishlist';
    pluralName: 'wishlists';
    displayName: 'Wishlist';
    description: "User's wishlist of desired products";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    user: Attribute.Relation<
      'api::wishlist.wishlist',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    wishlist_items: Attribute.Relation<
      'api::wishlist.wishlist',
      'oneToMany',
      'api::wishlist-item.wishlist-item'
    >;
    createdBy: Attribute.Relation<
      'api::wishlist.wishlist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wishlist.wishlist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWishlistItemWishlistItem extends Schema.CollectionType {
  collectionName: 'wishlist_items';
  info: {
    singularName: 'wishlist-item';
    pluralName: 'wishlist-items';
    displayName: 'Wishlist Item';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    wishlist: Attribute.Relation<
      'api::wishlist-item.wishlist-item',
      'manyToOne',
      'api::wishlist.wishlist'
    >;
    total: Attribute.String;
    product: Attribute.Relation<
      'api::wishlist-item.wishlist-item',
      'manyToOne',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wishlist-item.wishlist-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wishlist-item.wishlist-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::address.address': ApiAddressAddress;
      'api::auth.send-otp': ApiAuthSendOtp;
      'api::cart.cart': ApiCartCart;
      'api::cart-item.cart-item': ApiCartItemCartItem;
      'api::category.category': ApiCategoryCategory;
      'api::home-banner.home-banner': ApiHomeBannerHomeBanner;
      'api::internationl-user.internationl-user': ApiInternationlUserInternationlUser;
      'api::max-delivery-charge.max-delivery-charge': ApiMaxDeliveryChargeMaxDeliveryCharge;
      'api::order-detail.order-detail': ApiOrderDetailOrderDetail;
      'api::order-item.order-item': ApiOrderItemOrderItem;
      'api::payment-detail.payment-detail': ApiPaymentDetailPaymentDetail;
      'api::product.product': ApiProductProduct;
      'api::product-attribute.product-attribute': ApiProductAttributeProductAttribute;
      'api::product-sku.product-sku': ApiProductSkuProductSku;
      'api::subcategory.subcategory': ApiSubcategorySubcategory;
      'api::wishlist.wishlist': ApiWishlistWishlist;
      'api::wishlist-item.wishlist-item': ApiWishlistItemWishlistItem;
    }
  }
}
