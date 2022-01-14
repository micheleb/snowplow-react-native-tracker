import { NativeModules } from 'react-native';

/*
 * Copyright (c) 2020-2021 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */
const { RNSnowplowTracker } = NativeModules;

/*
 * Copyright (c) 2020-2021 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */
/**
 * Returns a function that accepts a side-effect function as its argument and subscribes
 * that function to aPromise's fullfillment,
 * and errHandle to aPromise's rejection.
 *
 * @param aPromise - A void Promise
 * @param errHandle - A function to handle the promise being rejected
 * @returns - A function subscribed to the Promise's fullfillment
 */
function safeWait(aPromise, errHandle) {
    return ((func) => {
        return (...args) => {
            return aPromise.then(() => func(...args)).catch((err) => errHandle(err));
        };
    });
}
/**
 * Returns a function that accepts a callback function as its argument and subscribes
 * that function to aPromise's fullfillment,
 * and errHandle to aPromise's rejection.
 *
 * @param aPromise - A void Promise
 * @param errHandle - A function to handle the promise being rejected
 * @returns - A function subscribed to the Promise's fullfillment
 */
function safeWaitCallback(callPromise, errHandle) {
    return ((func) => {
        return (...args) => {
            return callPromise.then(() => func(...args)).catch((err) => errHandle(err));
        };
    });
}
/**
 * Handles an error.
 *
 * @param err - The error to be handled.
 */
function errorHandler(err) {
    if (__DEV__) {
        console.warn('SnowplowTracker:' + err.message);
        return undefined;
    }
    return undefined;
}
/**
 * Helper to check whether its argument is of object type
 *
 * @param x - The argument to check.
 * @returns - A boolean
 */
function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
}

/*
 * Copyright (c) 2020-2021 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */
const logMessages = {
    // configuration errors
    namespace: 'namespace parameter is required to be set',
    endpoint: 'endpoint parameter is required to be set',
    network: 'networkConfig is invalid',
    tracker: 'trackerConfig is invalid',
    session: 'sessionConfig is invalid',
    emitter: 'emitterConfig is invalid',
    subject: 'subjectConfig is invalid',
    gdpr: 'gdprConfig is invalid',
    gc: 'gcConfig is invalid',
    // event errors
    context: 'invalid contexts parameter',
    selfDesc: 'selfDescribing event requires schema and data parameters to be set',
    evType: 'event argument can only be an object',
    screenViewReq: 'screenView event requires name as string parameter to be set',
    structuredReq: 'structured event requires category and action parameters to be set',
    pageviewReq: 'pageView event requires pageUrl parameter to be set',
    timingReq: 'timing event requires category, variable and timing parameters to be set',
    consentGReq: 'consentGranted event requires expiry, documentId and version parameters to be set',
    consentWReq: 'consentWithdrawn event requires all, documentId and version parameters to be set',
    ecomReq: 'ecommerceTransaction event requires orderId, totalValue to be set and items to be an array of valid ecommerceItems',
    // global contexts errors
    gcTagType: 'tag argument is required to be a string',
    gcType: 'global context argument is invalid',
    // api error prefix
    createTracker: 'createTracker:',
    removeTracker: 'removeTracker: trackerNamespace can only be a string',
    // methods
    trackSelfDesc: 'trackSelfDescribingEvent:',
    trackScreenView: 'trackScreenViewEvent:',
    trackStructured: 'trackStructuredEvent:',
    trackPageView: 'trackPageViewEvent:',
    trackTiming: 'trackTimingEvent:',
    trackConsentGranted: 'trackConsentGranted:',
    trackConsentWithdrawn: 'trackConsentWithdrawn:',
    trackEcommerceTransaction: 'trackEcommerceTransaction:',
    removeGlobalContexts: 'removeGlobalContexts:',
    addGlobalContexts: 'addGlobalContexts:',
    // setters
    setUserId: 'setUserId: userId can only be a string or null',
    setNetworkUserId: 'setNetworkUserId: networkUserId can only be a string(UUID) or null',
    setDomainUserId: 'setDomainUserId: domainUserId can only be a string(UUID) or null',
    setIpAddress: 'setIpAddress: ipAddress can only be a string or null',
    setUseragent: 'setUseragent: useragent can only be a string or null',
    setTimezone: 'setTimezone: timezone can only be a string or null',
    setLanguage: 'setLanguage: language can only be a string or null',
    setScreenResolution: 'setScreenResolution: screenResolution can only be of ScreenSize type or null',
    setScreenViewport: 'setScreenViewport: screenViewport can only be of ScreenSize type or null',
    setColorDepth: 'setColorDepth: colorDepth can only be a number(integer) or null',
    setSubjectData: 'setSubjectData:',
};

/*
 * Copyright (c) 2020-2021 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */
/**
 * Validates whether an object is valid self-describing
 *
 * @param sd {Object} - the object to validate
 * @returns - boolean
 */
function isValidSD(sd) {
    return isObject(sd)
        && typeof sd.schema === 'string'
        && isObject(sd.data);
}
/**
 * Validates whether an object is a valid array of contexts
 *
 * @param contexts {Object} - the object to validate
 * @returns - boolean promise
 */
function validateContexts(contexts) {
    const isValid = Object.prototype.toString.call(contexts) === '[object Array]'
        && contexts
            .map((c) => isValidSD(c))
            .reduce((acc, curr) => acc !== false && curr, true);
    if (!isValid) {
        return Promise.reject(new Error(logMessages.context));
    }
    return Promise.resolve(true);
}
/**
 * Validates whether an object is valid self describing
 *
 * @param argmap {Object} - the object to validate
 * @returns - boolean promise
 */
function validateSelfDesc(argmap) {
    if (!isValidSD(argmap)) {
        return Promise.reject(new Error(logMessages.selfDesc));
    }
    return Promise.resolve(true);
}
/**
 * Validates a screen view event
 *
 * @param argmap {Object} - the object to validate
 * @returns - boolean promise
 */
function validateScreenView(argmap) {
    // validate type
    if (!isObject(argmap)) {
        return Promise.reject(new Error(logMessages.evType));
    }
    // validate required props
    if (typeof argmap.name !== 'string') {
        return Promise.reject(new Error(logMessages.screenViewReq));
    }
    return Promise.resolve(true);
}
/**
 * Validates a structured event
 *
 * @param argmap {Object} - the object to validate
 * @returns - boolean promise
 */
function validateStructured(argmap) {
    // validate type
    if (!isObject(argmap)) {
        return Promise.reject(new Error(logMessages.evType));
    }
    // validate required props
    if (typeof argmap.category !== 'string'
        || typeof argmap.action !== 'string') {
        return Promise.reject(new Error(logMessages.structuredReq));
    }
    return Promise.resolve(true);
}
/**
 * Validates a page-view event
 *
 * @param argmap {Object} - the object to validate
 * @returns - boolean promise
 */
function validatePageView(argmap) {
    // validate type
    if (!isObject(argmap)) {
        return Promise.reject(new Error(logMessages.evType));
    }
    // validate required props
    if (typeof argmap.pageUrl !== 'string') {
        return Promise.reject(new Error(logMessages.pageviewReq));
    }
    return Promise.resolve(true);
}
/**
 * Validates a timing event
 *
 * @param argmap {Object} - the object to validate
 * @returns - boolean promise
 */
function validateTiming(argmap) {
    // validate type
    if (!isObject(argmap)) {
        return Promise.reject(new Error(logMessages.evType));
    }
    // validate required props
    if (typeof argmap.category !== 'string'
        || typeof argmap.variable !== 'string'
        || typeof argmap.timing !== 'number') {
        return Promise.reject(new Error(logMessages.timingReq));
    }
    return Promise.resolve(true);
}
/**
 * Validates a consent-granted event
 *
 * @param argmap {Object} - the object to validate
 * @returns - boolean promise
 */
function validateConsentGranted(argmap) {
    // validate type
    if (!isObject(argmap)) {
        return Promise.reject(new Error(logMessages.evType));
    }
    // validate required props
    if (typeof argmap.expiry !== 'string'
        || typeof argmap.documentId !== 'string'
        || typeof argmap.version !== 'string') {
        return Promise.reject(new Error(logMessages.consentGReq));
    }
    return Promise.resolve(true);
}
/**
 * Validates a consent-withdrawn event
 *
 * @param argmap {Object} - the object to validate
 * @returns - boolean promise
 */
function validateConsentWithdrawn(argmap) {
    // validate type
    if (!isObject(argmap)) {
        return Promise.reject(new Error(logMessages.evType));
    }
    // validate required props
    if (typeof argmap.all !== 'boolean'
        || typeof argmap.documentId !== 'string'
        || typeof argmap.version !== 'string') {
        return Promise.reject(new Error(logMessages.consentWReq));
    }
    return Promise.resolve(true);
}
/**
 * Validates whether an object is valid ecommerce-item
 *
 * @param item {Object} - the object to validate
 * @returns - boolean
 */
function isValidEcomItem(item) {
    if (isObject(item)
        && typeof item.sku === 'string'
        && typeof item.price === 'number'
        && typeof item.quantity === 'number') {
        return true;
    }
    return false;
}
/**
 * Validates an array of ecommerce-items
 *
 * @param items {Object} - the object to validate
 * @returns - boolean promise
 */
function validItemsArg(items) {
    return Object.prototype.toString.call(items) === '[object Array]'
        && items
            .map((i) => isValidEcomItem(i))
            .reduce((acc, curr) => acc !== false && curr, true);
}
/**
 * Validates an ecommerce-transaction event
 *
 * @param argmap {Object} - the object to validate
 * @returns - boolean promise
 */
function validateEcommerceTransaction(argmap) {
    // validate type
    if (!isObject(argmap)) {
        return Promise.reject(new Error(logMessages.evType));
    }
    // validate required props
    if (typeof argmap.orderId !== 'string'
        || typeof argmap.totalValue !== 'number'
        || !validItemsArg(argmap.items)) {
        return Promise.reject(new Error(logMessages.ecomReq));
    }
    return Promise.resolve(true);
}

/*
 * Copyright (c) 2020-2021 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */
/**
 * Configuration properties
 */
const networkProps = ['endpoint', 'method'];
const trackerProps = [
    'appId',
    'devicePlatform',
    'base64Encoding',
    'logLevel',
    'applicationContext',
    'platformContext',
    'geoLocationContext',
    'sessionContext',
    'screenContext',
    'screenViewAutotracking',
    'lifecycleAutotracking',
    'installAutotracking',
    'exceptionAutotracking',
    'diagnosticAutotracking'
];
const sessionProps = [
    'foregroundTimeout',
    'backgroundTimeout'
];
const emitterProps = [
    'bufferOption',
    'emitRange',
    'threadPoolSize',
    'byteLimitPost',
    'byteLimitGet',
];
const subjectProps = [
    'userId',
    'networkUserId',
    'domainUserId',
    'useragent',
    'ipAddress',
    'timezone',
    'language',
    'screenResolution',
    'screenViewport',
    'colorDepth'
];
const gdprProps = [
    'basisForProcessing',
    'documentId',
    'documentVersion',
    'documentDescription'
];
const gcProps = [
    'tag',
    'globalContexts'
];
/**
 * Validates whether an object is of valid configuration given its default keys
 *
 * @param config {Object} - the object to validate
 * @param defaultKeys {Array} - the default keys to validate against
 * @returns - boolean
 */
function isValidConfig(config, defaultKeys) {
    return Object.keys(config).every(key => defaultKeys.includes(key));
}
/**
 * Validates the networkConfig
 *
 * @param config {Object} - the config to validate
 * @returns - boolean
 */
function isValidNetworkConf(config) {
    if (!isObject(config)
        || !isValidConfig(config, networkProps)
        || typeof config.endpoint !== 'string'
        || !config.endpoint) {
        return false;
    }
    return true;
}
/**
 * Validates the trackerConfig
 *
 * @param config {Object} - the config to validate
 * @returns - boolean
 */
function isValidTrackerConf(config) {
    if (!isObject(config) || !isValidConfig(config, trackerProps)) {
        return false;
    }
    return true;
}
/**
 * Validates the sessionConfig
 *
 * @param config {Object} - the config to validate
 * @returns - boolean
 */
function isValidSessionConf(config) {
    if (!isObject(config)
        || !isValidConfig(config, sessionProps)
        || !sessionProps.every(key => Object.keys(config).includes(key))) {
        return false;
    }
    return true;
}
/**
 * Validates the emitterConfig
 *
 * @param config {Object} - the config to validate
 * @returns - boolean
 */
function isValidEmitterConf(config) {
    if (!isObject(config) || !isValidConfig(config, emitterProps)) {
        return false;
    }
    return true;
}
/**
 * Validates whether an object is of ScreenSize type
 *
 * @param arr {Object} - the object to validate
 * @returns - boolean
 */
function isScreenSize(arr) {
    return Array.isArray(arr)
        && arr.length === 2
        && arr.every((n) => typeof n === 'number');
}
/**
 * Validates the subjectConfig
 *
 * @param config {Object} - the config to validate
 * @returns - boolean
 */
function isValidSubjectConf(config) {
    if (!isObject(config) || !isValidConfig(config, subjectProps)) {
        return false;
    }
    // validating ScreenSize here to simplify array handling in bridge
    if (Object.prototype.hasOwnProperty.call(config, 'screenResolution')
        && config.screenResolution !== null
        && !isScreenSize(config.screenResolution)) {
        return false;
    }
    if (Object.prototype.hasOwnProperty.call(config, 'screenViewport')
        && config.screenViewport !== null
        && !isScreenSize(config.screenViewport)) {
        return false;
    }
    return true;
}
/**
 * Validates the gdprConfig
 *
 * @param config {Object} - the config to validate
 * @returns - boolean
 */
function isValidGdprConf(config) {
    if (!isObject(config)
        || !isValidConfig(config, gdprProps)
        || !gdprProps.every(key => Object.keys(config).includes(key))
        || !['consent', 'contract', 'legal_obligation', 'legitimate_interests', 'public_task', 'vital_interests'].includes(config.basisForProcessing)) {
        return false;
    }
    return true;
}
/**
 * Validates whether an object is of GlobalContext type
 *
 * @param gc {Object} - the object to validate
 * @returns - boolean
 */
function isValidGC(gc) {
    return isObject(gc)
        && isValidConfig(gc, gcProps)
        && typeof gc.tag === 'string'
        && Array.isArray(gc.globalContexts)
        && gc.globalContexts.every(c => isValidSD(c));
}
/**
 * Validates the GCConfig (global contexts)
 *
 * @param config {Object} - the config to validate
 * @returns - boolean
 */
function isValidGCConf(config) {
    if (!Array.isArray(config)) {
        return false;
    }
    if (!config.every(gc => isValidGC(gc))) {
        return false;
    }
    return true;
}
/**
 * Validates the initTrackerConfiguration
 *
 * @param init {Object} - the config to validate
 * @returns - boolean promise
 */
function initValidate(init) {
    if (typeof init.namespace !== 'string' || !init.namespace) {
        return Promise.reject(new Error(logMessages.namespace));
    }
    if (!Object.prototype.hasOwnProperty.call(init, 'networkConfig')
        || !isValidNetworkConf(init.networkConfig)) {
        return Promise.reject(new Error(logMessages.network));
    }
    if (Object.prototype.hasOwnProperty.call(init, 'trackerConfig')
        && !isValidTrackerConf(init.trackerConfig)) {
        return Promise.reject(new Error(logMessages.tracker));
    }
    if (Object.prototype.hasOwnProperty.call(init, 'sessionConfig')
        && (!isValidSessionConf(init.sessionConfig))) {
        return Promise.reject(new Error(logMessages.session));
    }
    if (Object.prototype.hasOwnProperty.call(init, 'emitterConfig')
        && !isValidEmitterConf(init.emitterConfig)) {
        return Promise.reject(new Error(logMessages.emitter));
    }
    if (Object.prototype.hasOwnProperty.call(init, 'subjectConfig')
        && !isValidSubjectConf(init.subjectConfig)) {
        return Promise.reject(new Error(logMessages.subject));
    }
    if (Object.prototype.hasOwnProperty.call(init, 'gdprConfig')
        && !isValidGdprConf(init.gdprConfig)) {
        return Promise.reject(new Error(logMessages.gdpr));
    }
    if (Object.prototype.hasOwnProperty.call(init, 'gcConfig')
        && !isValidGCConf(init.gcConfig)) {
        return Promise.reject(new Error(logMessages.gc));
    }
    return Promise.resolve(true);
}

/*
 * Copyright (c) 2020-2021 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */
/**
 * Tracks a self-describing event
 *
 * @param namespace {string} - the tracker namespace
 * @param argmap {Object} - the event data
 * @param contexts {Array}- the event contexts
 * @returns {Promise}
 */
function trackSelfDescribingEvent$1(namespace, argmap, contexts = []) {
    return validateSelfDesc(argmap)
        .then(() => validateContexts(contexts))
        .then(() => RNSnowplowTracker.trackSelfDescribingEvent({
        tracker: namespace,
        eventData: argmap,
        contexts: contexts,
    }))
        .catch((error) => {
        throw new Error(`${logMessages.trackSelfDesc} ${error.message}`);
    });
}
/**
 * Tracks a screen-view event
 *
 * @param namespace {string} - the tracker namespace
 * @param argmap {Object} - the event data
 * @param contexts {Array}- the event contexts
 * @returns {Promise}
 */
function trackScreenViewEvent$1(namespace, argmap, contexts = []) {
    return validateScreenView(argmap)
        .then(() => validateContexts(contexts))
        .then(() => RNSnowplowTracker.trackScreenViewEvent({
        tracker: namespace,
        eventData: argmap,
        contexts: contexts,
    }))
        .catch((error) => {
        throw new Error(`${logMessages.trackScreenView} ${error.message}`);
    });
}
/**
 * Tracks a structured event
 *
 * @param namespace {string} - the tracker namespace
 * @param argmap {Object} - the event data
 * @param contexts {Array}- the event contexts
 * @returns {Promise}
 */
function trackStructuredEvent$1(namespace, argmap, contexts = []) {
    return validateStructured(argmap)
        .then(() => validateContexts(contexts))
        .then(() => RNSnowplowTracker.trackStructuredEvent({
        tracker: namespace,
        eventData: argmap,
        contexts: contexts,
    }))
        .catch((error) => {
        throw new Error(`${logMessages.trackStructured} ${error.message} data: ${JSON.stringify(argmap)}`);
    });
}
/**
 * Tracks a page-view event
 *
 * @param namespace {string} - the tracker namespace
 * @param argmap {Object} - the event data
 * @param contexts {Array}- the event contexts
 * @returns {Promise}
 */
function trackPageViewEvent$1(namespace, argmap, contexts = []) {
    return validatePageView(argmap)
        .then(() => validateContexts(contexts))
        .then(() => RNSnowplowTracker.trackPageViewEvent({
        tracker: namespace,
        eventData: argmap,
        contexts: contexts,
    }))
        .catch((error) => {
        throw new Error(`${logMessages.trackPageView} ${error.message}`);
    });
}
/**
 * Tracks a timing event
 *
 * @param namespace {string} - the tracker namespace
 * @param argmap {Object} - the event data
 * @param contexts {Array}- the event contexts
 * @returns {Promise}
 */
function trackTimingEvent$1(namespace, argmap, contexts = []) {
    return validateTiming(argmap)
        .then(() => validateContexts(contexts))
        .then(() => RNSnowplowTracker.trackTimingEvent({
        tracker: namespace,
        eventData: argmap,
        contexts: contexts,
    }))
        .catch((error) => {
        throw new Error(`${logMessages.trackTiming} ${error.message}`);
    });
}
/**
 * Tracks a consent-granted event
 *
 * @param namespace {string} - the tracker namespace
 * @param argmap {Object} - the event data
 * @param contexts {Array}- the event contexts
 * @returns {Promise}
 */
function trackConsentGrantedEvent$1(namespace, argmap, contexts = []) {
    return validateConsentGranted(argmap)
        .then(() => validateContexts(contexts))
        .then(() => RNSnowplowTracker.trackConsentGrantedEvent({
        tracker: namespace,
        eventData: argmap,
        contexts: contexts,
    }))
        .catch((error) => {
        throw new Error(`${logMessages.trackConsentGranted} ${error.message}`);
    });
}
/**
 * Tracks a consent-withdrawn event
 *
 * @param namespace {string} - the tracker namespace
 * @param argmap {Object} - the event data
 * @param contexts {Array}- the event contexts
 * @returns {Promise}
 */
function trackConsentWithdrawnEvent$1(namespace, argmap, contexts = []) {
    return validateConsentWithdrawn(argmap)
        .then(() => validateContexts(contexts))
        .then(() => RNSnowplowTracker.trackConsentWithdrawnEvent({
        tracker: namespace,
        eventData: argmap,
        contexts: contexts,
    }))
        .catch((error) => {
        throw new Error(`${logMessages.trackConsentWithdrawn} ${error.message}`);
    });
}
/**
 * Tracks an ecommerce-transaction event
 *
 * @param namespace {string} - the tracker namespace
 * @param argmap {Object} - the event data
 * @param contexts {Array}- the event contexts
 * @returns {Promise}
 */
function trackEcommerceTransactionEvent$1(namespace, argmap, contexts = []) {
    return validateEcommerceTransaction(argmap)
        .then(() => validateContexts(contexts))
        .then(() => RNSnowplowTracker.trackEcommerceTransactionEvent({
        tracker: namespace,
        eventData: argmap,
        contexts: contexts,
    }))
        .catch((error) => {
        throw new Error(`${logMessages.trackEcommerceTransaction} ${error.message}`);
    });
}

/*
 * Copyright (c) 2020-2021 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */
/**
 * Sets the userId of the tracker subject
 *
 * @param namespace {string} - the tracker namespace
 * @param newUid {string | null} - the new userId
 * @returns - Promise
 */
function setUserId$1(namespace, newUid) {
    if (!(newUid === null || typeof newUid === 'string')) {
        return Promise.reject(new Error(logMessages.setUserId));
    }
    return Promise.resolve(RNSnowplowTracker.setUserId({
        tracker: namespace,
        userId: newUid
    }));
}
/**
 * Sets the networkUserId of the tracker subject
 *
 * @param namespace {string} - the tracker namespace
 * @param newNuid {string | null} - the new networkUserId
 * @returns - Promise
 */
function setNetworkUserId$1(namespace, newNuid) {
    if (!(newNuid === null || typeof newNuid === 'string')) {
        return Promise.reject(new Error(logMessages.setNetworkUserId));
    }
    return Promise.resolve(RNSnowplowTracker.setNetworkUserId({
        tracker: namespace,
        networkUserId: newNuid
    }));
}
/**
 * Sets the domainUserId of the tracker subject
 *
 * @param namespace {string} - the tracker namespace
 * @param newDuid {string | null} - the new domainUserId
 * @returns - Promise
 */
function setDomainUserId$1(namespace, newDuid) {
    if (!(newDuid === null || typeof newDuid === 'string')) {
        return Promise.reject(new Error(logMessages.setDomainUserId));
    }
    return Promise.resolve(RNSnowplowTracker.setDomainUserId({
        tracker: namespace,
        domainUserId: newDuid
    }));
}
/**
 * Sets the ipAddress of the tracker subject
 *
 * @param namespace {string} - the tracker namespace
 * @param newIp {string | null} - the new ipAddress
 * @returns - Promise
 */
function setIpAddress$1(namespace, newIp) {
    if (!(newIp === null || typeof newIp === 'string')) {
        return Promise.reject(new Error(logMessages.setIpAddress));
    }
    return Promise.resolve(RNSnowplowTracker.setIpAddress({
        tracker: namespace,
        ipAddress: newIp
    }));
}
/**
 * Sets the useragent of the tracker subject
 *
 * @param namespace {string} - the tracker namespace
 * @param newUagent {string | null} - the new useragent
 * @returns - Promise
 */
function setUseragent$1(namespace, newUagent) {
    if (!(newUagent === null || typeof newUagent === 'string')) {
        return Promise.reject(new Error(logMessages.setUseragent));
    }
    return Promise.resolve(RNSnowplowTracker.setUseragent({
        tracker: namespace,
        useragent: newUagent
    }));
}
/**
 * Sets the timezone of the tracker subject
 *
 * @param namespace {string} - the tracker namespace
 * @param newTz {string | null} - the new timezone
 * @returns - Promise
 */
function setTimezone$1(namespace, newTz) {
    if (!(newTz === null || typeof newTz === 'string')) {
        return Promise.reject(new Error(logMessages.setTimezone));
    }
    return Promise.resolve(RNSnowplowTracker.setTimezone({
        tracker: namespace,
        timezone: newTz
    }));
}
/**
 * Sets the language of the tracker subject
 *
 * @param namespace {string} - the tracker namespace
 * @param newLang {string | null} - the new language
 * @returns - Promise
 */
function setLanguage$1(namespace, newLang) {
    if (!(newLang === null || typeof newLang === 'string')) {
        return Promise.reject(new Error(logMessages.setLanguage));
    }
    return Promise.resolve(RNSnowplowTracker.setLanguage({
        tracker: namespace,
        language: newLang
    }));
}
/**
 * Sets the screenResolution of the tracker subject
 *
 * @param namespace {string} - the tracker namespace
 * @param newRes {ScreenSize | null} - the new screenResolution
 * @returns - Promise
 */
function setScreenResolution$1(namespace, newRes) {
    if (!(newRes === null || isScreenSize(newRes))) {
        return Promise.reject(new Error(logMessages.setScreenResolution));
    }
    return Promise.resolve(RNSnowplowTracker.setScreenResolution({
        tracker: namespace,
        screenResolution: newRes
    }));
}
/**
 * Sets the screenViewport of the tracker subject
 *
 * @param namespace {string} - the tracker namespace
 * @param newView {ScreenSize | null} - the new screenViewport
 * @returns - Promise
 */
function setScreenViewport$1(namespace, newView) {
    if (!(newView === null || isScreenSize(newView))) {
        return Promise.reject(new Error(logMessages.setScreenViewport));
    }
    return Promise.resolve(RNSnowplowTracker.setScreenViewport({
        tracker: namespace,
        screenViewport: newView
    }));
}
/**
 * Sets the colorDepth of the tracker subject
 *
 * @param namespace {string} - the tracker namespace
 * @param newColorD {number | null} - the new colorDepth
 * @returns - Promise
 */
function setColorDepth$1(namespace, newColorD) {
    if (!(newColorD === null || typeof newColorD === 'number')) {
        return Promise.reject(new Error(logMessages.setColorDepth));
    }
    return Promise.resolve(RNSnowplowTracker.setColorDepth({
        tracker: namespace,
        colorDepth: newColorD
    }));
}
const setterMap = {
    userId: setUserId$1,
    networkUserId: setNetworkUserId$1,
    domainUserId: setDomainUserId$1,
    ipAddress: setIpAddress$1,
    useragent: setUseragent$1,
    timezone: setTimezone$1,
    language: setLanguage$1,
    screenResolution: setScreenResolution$1,
    screenViewport: setScreenViewport$1,
    colorDepth: setColorDepth$1
};
/**
 * Sets the tracker subject
 *
 * @param namespace {string} - the tracker namespace
 * @param config {SubjectConfiguration} - the new subject data
 * @returns - Promise
 */
function setSubjectData$1(namespace, config) {
    if (!isValidSubjectConf(config)) {
        return Promise.reject(new Error(`${logMessages.setSubjectData} ${logMessages.subject}`));
    }
    const promises = Object.keys(config)
        .map((k) => {
        const fun = setterMap[k];
        return fun ? fun(namespace, config[k]) : undefined;
    })
        .filter((f) => f !== undefined);
    // to use Promise.all (Promise.allSettled not supported in all RN versions)
    const safePromises = promises
        .map((p) => p
        .then((x) => Object.assign({
        status: 'fulfilled',
        value: x
    }))
        .catch((err) => Object.assign({
        status: 'rejected',
        reason: err.message
    })));
    return Promise.all(safePromises).then((outcomes) => {
        const anyReasons = outcomes.filter((res) => res.status === 'rejected');
        if (anyReasons.length > 0) {
            const allReasons = anyReasons
                .reduce((acc, curr) => acc + ':' + curr.reason, logMessages.setSubjectData);
            throw new Error(allReasons);
        }
        return true;
    });
}

/*
 * Copyright (c) 2020-2021 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */
/**
 * Create a tracker from specified initial configuration.
 *
 * @param initConfig {Object} - The initial tracker configuration
 * @returns - A promise fullfilled if the tracker is initialized
 */
function createTracker$1(initConfig) {
    return initValidate(initConfig)
        .then(() => RNSnowplowTracker.createTracker(initConfig))
        .catch((error) => {
        throw new Error(`${logMessages.createTracker} ${error.message}.`);
    });
}
/**
 * Removes the tracker with given namespace
 *
 * @param trackerNamespace {string} - The tracker namespace
 * @returns - A boolean promise
 */
function removeTracker$1(trackerNamespace) {
    if (typeof trackerNamespace !== 'string') {
        return Promise.reject(new Error(logMessages.removeTracker));
    }
    return Promise.resolve(RNSnowplowTracker.removeTracker({ tracker: trackerNamespace }));
}
/**
 * Removes all existing trackers
 *
 * @returns - A void promise
 */
function removeAllTrackers$1() {
    return Promise.resolve(RNSnowplowTracker.removeAllTrackers());
}
/**
 * Returns a function to track a SelfDescribing event by a tracker
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to track a SelfDescribing event
 */
function trackSelfDescribingEvent(namespace) {
    return function (argmap, contexts = []) {
        return trackSelfDescribingEvent$1(namespace, argmap, contexts);
    };
}
/**
 * Returns a function to track a ScreenView event by a tracker
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to track a ScreenView event
 */
function trackScreenViewEvent(namespace) {
    return function (argmap, contexts = []) {
        return trackScreenViewEvent$1(namespace, argmap, contexts);
    };
}
/**
 * Returns a function to track a Structured event by a tracker
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to track a Structured event
 */
function trackStructuredEvent(namespace) {
    return function (argmap, contexts = []) {
        return trackStructuredEvent$1(namespace, argmap, contexts);
    };
}
/**
 * Returns a function to track a PageView event by a tracker
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to track a PageView event
 */
function trackPageViewEvent(namespace) {
    return function (argmap, contexts = []) {
        return trackPageViewEvent$1(namespace, argmap, contexts);
    };
}
/**
 * Returns a function to track a Timing event by a tracker
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to track a Timing event
 */
function trackTimingEvent(namespace) {
    return function (argmap, contexts = []) {
        return trackTimingEvent$1(namespace, argmap, contexts);
    };
}
/**
 * Returns a function to track a ConsentGranted event by a tracker
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to track a ConsentGranted event
 */
function trackConsentGrantedEvent(namespace) {
    return function (argmap, contexts = []) {
        return trackConsentGrantedEvent$1(namespace, argmap, contexts);
    };
}
/**
 * Returns a function to track a ConsentWithdrawn event by a tracker
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to track a ConsentWithdrawn event
 */
function trackConsentWithdrawnEvent(namespace) {
    return function (argmap, contexts = []) {
        return trackConsentWithdrawnEvent$1(namespace, argmap, contexts);
    };
}
/**
 * Returns a function to track an EcommerceTransaction event by a tracker
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to track an EcommerceTransaction event
 */
function trackEcommerceTransactionEvent(namespace) {
    return function (argmap, contexts = []) {
        return trackEcommerceTransactionEvent$1(namespace, argmap, contexts);
    };
}
/**
 * Returns a function to remove global contexts by a tracker
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to remove global contexts
 */
function removeGlobalContexts(namespace) {
    return function (tag) {
        if (typeof tag !== 'string') {
            return Promise.reject(new Error(`${logMessages.removeGlobalContexts} ${logMessages.gcTagType}`));
        }
        return Promise.resolve(RNSnowplowTracker.removeGlobalContexts({ tracker: namespace, removeTag: tag }));
    };
}
/**
 * Returns a function to add global contexts by a tracker
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to add global contexts
 */
function addGlobalContexts(namespace) {
    return function (gc) {
        if (!isValidGC(gc)) {
            return Promise.reject(new Error(`${logMessages.addGlobalContexts} ${logMessages.gcType}`));
        }
        return Promise.resolve(RNSnowplowTracker.addGlobalContexts({ tracker: namespace, addGlobalContext: gc }));
    };
}
/**
 * Returns a function to set the subject userId
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to set the userId
 */
function setUserId(namespace) {
    return function (newUid) {
        return setUserId$1(namespace, newUid);
    };
}
/**
 * Returns a function to set the subject networkUserId
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to set the networkUserId
 */
function setNetworkUserId(namespace) {
    return function (newNuid) {
        return setNetworkUserId$1(namespace, newNuid);
    };
}
/**
 * Returns a function to set the subject domainUserId
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to set the domainUserId
 */
function setDomainUserId(namespace) {
    return function (newDuid) {
        return setDomainUserId$1(namespace, newDuid);
    };
}
/**
 * Returns a function to set the subject ipAddress
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to set the ipAddress
 */
function setIpAddress(namespace) {
    return function (newIp) {
        return setIpAddress$1(namespace, newIp);
    };
}
/**
 * Returns a function to set the subject useragent
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to set the useragent
 */
function setUseragent(namespace) {
    return function (newUagent) {
        return setUseragent$1(namespace, newUagent);
    };
}
/**
 * Returns a function to set the subject timezone
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to set the timezone
 */
function setTimezone(namespace) {
    return function (newTz) {
        return setTimezone$1(namespace, newTz);
    };
}
/**
 * Returns a function to set the subject language
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to set the language
 */
function setLanguage(namespace) {
    return function (newLang) {
        return setLanguage$1(namespace, newLang);
    };
}
/**
 * Returns a function to set the subject screenResolution
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to set the screenResolution
 */
function setScreenResolution(namespace) {
    return function (newRes) {
        return setScreenResolution$1(namespace, newRes);
    };
}
/**
 * Returns a function to set the subject screenViewport
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to set the screenViewport
 */
function setScreenViewport(namespace) {
    return function (newView) {
        return setScreenViewport$1(namespace, newView);
    };
}
/**
 * Returns a function to set the subject colorDepth
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to set the colorDepth
 */
function setColorDepth(namespace) {
    return function (newColorD) {
        return setColorDepth$1(namespace, newColorD);
    };
}
/**
 * Returns a function to set subject data
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to set subject data
 */
function setSubjectData(namespace) {
    return function (config) {
        return setSubjectData$1(namespace, config);
    };
}
/**
 * Returns a function to get the current session userId
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to get the session userId
 */
function getSessionUserId(namespace) {
    return function () {
        return Promise
            .resolve(RNSnowplowTracker.getSessionUserId({ tracker: namespace }));
    };
}
/**
 * Returns a function to get the current sessionId
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to get the sessionId
 */
function getSessionId(namespace) {
    return function () {
        return Promise
            .resolve(RNSnowplowTracker.getSessionId({ tracker: namespace }));
    };
}
/**
 * Returns a function to get the current session index
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to get the session index
 */
function getSessionIndex(namespace) {
    return function () {
        return Promise
            .resolve(RNSnowplowTracker.getSessionIndex({ tracker: namespace }));
    };
}
/**
 * Returns a function to get whether the app is in background
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to get whether the app isInBackground
 */
function getIsInBackground(namespace) {
    return function () {
        return Promise
            .resolve(RNSnowplowTracker.getIsInBackground({ tracker: namespace }));
    };
}
/**
 * Returns a function to get the background index
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to get the backgroundIndex
 */
function getBackgroundIndex(namespace) {
    return function () {
        return Promise
            .resolve(RNSnowplowTracker.getBackgroundIndex({ tracker: namespace }));
    };
}
/**
 * Returns a function to get the foreground index
 *
 * @param namespace {string} - The tracker namespace
 * @returns - A function to get the foregroundIndex
 */
function getForegroundIndex(namespace) {
    return function () {
        return Promise
            .resolve(RNSnowplowTracker.getForegroundIndex({ tracker: namespace }));
    };
}

/*
 * Copyright (c) 2020-2021 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */
/**
 * Creates a React Native Tracker object
 *
 * @param namespace {string} - The tracker namespace
 * @param networkConfig {Object} - The network configuration
 * @param control {Array} - The tracker controller configuration
 * @returns The tracker object
 */
function createTracker(namespace, networkConfig, controllerConfig = {}) {
    // initTrackerPromise
    const initTrackerPromise = Promise.resolve(createTracker$1({
        namespace,
        networkConfig,
        ...controllerConfig
    }));
    // mkMethod creates methods subscribed to the initTrackerPromise
    const mkMethod = safeWait(initTrackerPromise, errorHandler);
    // mkCallback creates callbacks subscribed to the initTrackerPromise
    const mkCallback = safeWaitCallback(initTrackerPromise, errorHandler);
    // track methods
    const trackSelfDescribingEvent$1 = mkMethod(trackSelfDescribingEvent(namespace));
    const trackScreenViewEvent$1 = mkMethod(trackScreenViewEvent(namespace));
    const trackStructuredEvent$1 = mkMethod(trackStructuredEvent(namespace));
    const trackPageViewEvent$1 = mkMethod(trackPageViewEvent(namespace));
    const trackTimingEvent$1 = mkMethod(trackTimingEvent(namespace));
    const trackConsentGrantedEvent$1 = mkMethod(trackConsentGrantedEvent(namespace));
    const trackConsentWithdrawnEvent$1 = mkMethod(trackConsentWithdrawnEvent(namespace));
    const trackEcommerceTransactionEvent$1 = mkMethod(trackEcommerceTransactionEvent(namespace));
    // Global Contexts
    const removeGlobalContexts$1 = mkMethod(removeGlobalContexts(namespace));
    const addGlobalContexts$1 = mkMethod(addGlobalContexts(namespace));
    // setters
    const setUserId$1 = mkMethod(setUserId(namespace));
    const setNetworkUserId$1 = mkMethod(setNetworkUserId(namespace));
    const setDomainUserId$1 = mkMethod(setDomainUserId(namespace));
    const setIpAddress$1 = mkMethod(setIpAddress(namespace));
    const setUseragent$1 = mkMethod(setUseragent(namespace));
    const setTimezone$1 = mkMethod(setTimezone(namespace));
    const setLanguage$1 = mkMethod(setLanguage(namespace));
    const setScreenResolution$1 = mkMethod(setScreenResolution(namespace));
    const setScreenViewport$1 = mkMethod(setScreenViewport(namespace));
    const setColorDepth$1 = mkMethod(setColorDepth(namespace));
    const setSubjectData$1 = mkMethod(setSubjectData(namespace));
    // callbacks
    const getSessionUserId$1 = mkCallback(getSessionUserId(namespace));
    const getSessionId$1 = mkCallback(getSessionId(namespace));
    const getSessionIndex$1 = mkCallback(getSessionIndex(namespace));
    const getIsInBackground$1 = mkCallback(getIsInBackground(namespace));
    const getBackgroundIndex$1 = mkCallback(getBackgroundIndex(namespace));
    const getForegroundIndex$1 = mkCallback(getForegroundIndex(namespace));
    return Object.freeze({
        trackSelfDescribingEvent: trackSelfDescribingEvent$1,
        trackScreenViewEvent: trackScreenViewEvent$1,
        trackStructuredEvent: trackStructuredEvent$1,
        trackPageViewEvent: trackPageViewEvent$1,
        trackTimingEvent: trackTimingEvent$1,
        trackConsentGrantedEvent: trackConsentGrantedEvent$1,
        trackConsentWithdrawnEvent: trackConsentWithdrawnEvent$1,
        trackEcommerceTransactionEvent: trackEcommerceTransactionEvent$1,
        removeGlobalContexts: removeGlobalContexts$1,
        addGlobalContexts: addGlobalContexts$1,
        setUserId: setUserId$1,
        setNetworkUserId: setNetworkUserId$1,
        setDomainUserId: setDomainUserId$1,
        setIpAddress: setIpAddress$1,
        setUseragent: setUseragent$1,
        setTimezone: setTimezone$1,
        setLanguage: setLanguage$1,
        setScreenResolution: setScreenResolution$1,
        setScreenViewport: setScreenViewport$1,
        setColorDepth: setColorDepth$1,
        setSubjectData: setSubjectData$1,
        getSessionUserId: getSessionUserId$1,
        getSessionId: getSessionId$1,
        getSessionIndex: getSessionIndex$1,
        getIsInBackground: getIsInBackground$1,
        getBackgroundIndex: getBackgroundIndex$1,
        getForegroundIndex: getForegroundIndex$1,
    });
}
/**
 * Removes a tracker given its namespace
 *
 * @param trackerNamespace {string}
 * @returns - A boolean promise
 */
function removeTracker(trackerNamespace) {
    return removeTracker$1(trackerNamespace)
        .catch((e) => errorHandler(e));
}
/**
 * Removes all trackers
 *
 * @returns - A boolean promise
 */
function removeAllTrackers() {
    return removeAllTrackers$1()
        .catch((e) => errorHandler(e));
}

export { createTracker, removeAllTrackers, removeTracker };
//# sourceMappingURL=index.js.map
