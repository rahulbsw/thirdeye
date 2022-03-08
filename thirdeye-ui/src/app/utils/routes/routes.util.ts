import {
    getRecognizedQuery,
    SEARCH_TERM_QUERY_PARAM_KEY,
} from "../params/params.util";

const PLACEHOLDER_ROUTE_ID = ":id";

export const AppRouteRelative = {
    HOME: "home",
    LOGIN: "login",
    LOGOUT: "logout",
    ALERTS: "alerts",
    ALERTS_ALL: "all",
    ALERTS_ALERT: `${PLACEHOLDER_ROUTE_ID}`,
    ALERTS_VIEW: `view`,
    ALERTS_CREATE: "create",
    ALERTS_UPDATE: `update`,
    ANOMALIES: "anomalies",
    ANOMALIES_ALL: "all",
    ANOMALIES_ANOMALY: `${PLACEHOLDER_ROUTE_ID}`,
    ANOMALIES_ANOMALY_VIEW: `view`,
    CONFIGURATION: "configuration",
    SUBSCRIPTION_GROUPS: "subscription-groups",
    SUBSCRIPTION_GROUPS_ALL: "all",
    SUBSCRIPTION_GROUPS_VIEW: `view/id/${PLACEHOLDER_ROUTE_ID}`,
    SUBSCRIPTION_GROUPS_CREATE: "create",
    SUBSCRIPTION_GROUPS_UPDATE: `update/id/${PLACEHOLDER_ROUTE_ID}`,
    DATASETS: "datasets",
    DATASETS_ALL: "all",
    DATASETS_VIEW: `view/id/${PLACEHOLDER_ROUTE_ID}`,
    DATASETS_ONBOARD: "onboard",
    DATASETS_UPDATE: `update/id/${PLACEHOLDER_ROUTE_ID}`,
    DATASOURCES: "datasources",
    DATASOURCES_ALL: "all",
    DATASOURCES_VIEW: `view/id/${PLACEHOLDER_ROUTE_ID}`,
    DATASOURCES_CREATE: "create",
    DATASOURCES_UPDATE: `update/id/${PLACEHOLDER_ROUTE_ID}`,
    ALERT_TEMPLATES: "alert-templates",
    ALERT_TEMPLATES_ALL: "all",
    ALERT_TEMPLATES_CREATE: "create",
    ALERT_TEMPLATES_ALERT_TEMPLATE: `${PLACEHOLDER_ROUTE_ID}`,
    ALERT_TEMPLATES_ALERT_TEMPLATE_VIEW: "view",
    ALERT_TEMPLATES_ALERT_TEMPLATE_UPDATE: "update",
    METRICS: "metrics",
    METRICS_ALL: "all",
    METRICS_VIEW: `view/id/${PLACEHOLDER_ROUTE_ID}`,
    METRICS_CREATE: `create`,
    METRICS_UPDATE: `update/id/${PLACEHOLDER_ROUTE_ID}`,
    ROOT_CAUSE_ANALYSIS: `root-cause-analysis`,
    ROOT_CAUSE_ANALYSIS_FOR_ANOMALY: `anomaly/${PLACEHOLDER_ROUTE_ID}`,
    ROOT_CAUSE_ANALYSIS_FOR_ANOMALY_INDEX: `anomaly/${PLACEHOLDER_ROUTE_ID}/index`,
};

export const AppRoute = {
    BASE: "/",
    HOME: "/home",
    LOGIN: "/login",
    LOGOUT: "/logout",
    ALERTS: `/${AppRouteRelative.ALERTS}`,
    ALERTS_ALL: `/${AppRouteRelative.ALERTS}/${AppRouteRelative.ALERTS_ALL}`,
    ALERTS_CREATE: `/${AppRouteRelative.ALERTS}/${AppRouteRelative.ALERTS_CREATE}`,
    ALERTS_ALERT: `/${AppRouteRelative.ALERTS}/${AppRouteRelative.ALERTS_ALERT}`,
    ALERTS_UPDATE: `/${AppRouteRelative.ALERTS}/${AppRouteRelative.ALERTS_ALERT}/${AppRouteRelative.ALERTS_UPDATE}`,
    ANOMALIES: `/${AppRouteRelative.ANOMALIES}`,
    ANOMALIES_ALL: `/${AppRouteRelative.ANOMALIES}/${AppRouteRelative.ANOMALIES_ALL}`,
    ANOMALIES_ANOMALY: `/${AppRouteRelative.ANOMALIES}/${AppRouteRelative.ANOMALIES_ANOMALY}`,
    ANOMALIES_VIEW: `/${AppRouteRelative.ANOMALIES}/${AppRouteRelative.ANOMALIES_ANOMALY}/${AppRouteRelative.ANOMALIES_ANOMALY_VIEW}`,
    CONFIGURATION: `/${AppRouteRelative.CONFIGURATION}`,
    SUBSCRIPTION_GROUPS: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.SUBSCRIPTION_GROUPS}`,
    SUBSCRIPTION_GROUPS_ALL: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.SUBSCRIPTION_GROUPS}/${AppRouteRelative.SUBSCRIPTION_GROUPS_ALL}`,
    SUBSCRIPTION_GROUPS_VIEW: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.SUBSCRIPTION_GROUPS}/${AppRouteRelative.SUBSCRIPTION_GROUPS_VIEW}`,
    SUBSCRIPTION_GROUPS_CREATE: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.SUBSCRIPTION_GROUPS}/${AppRouteRelative.SUBSCRIPTION_GROUPS_CREATE}`,
    SUBSCRIPTION_GROUPS_UPDATE: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.SUBSCRIPTION_GROUPS}/${AppRouteRelative.SUBSCRIPTION_GROUPS_UPDATE}`,
    DATASETS: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.DATASETS}`,
    DATASETS_ALL: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.DATASETS}/${AppRouteRelative.DATASETS_ALL}`,
    DATASETS_VIEW: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.DATASETS}/${AppRouteRelative.DATASETS_VIEW}`,
    DATASETS_ONBOARD: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.DATASETS}/${AppRouteRelative.DATASETS_ONBOARD}`,
    DATASETS_UPDATE: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.DATASETS}/${AppRouteRelative.DATASETS_UPDATE}`,
    DATASOURCES: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.DATASOURCES}`,
    DATASOURCES_ALL: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.DATASOURCES}/${AppRouteRelative.DATASOURCES_ALL}`,
    DATASOURCES_VIEW: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.DATASOURCES}/${AppRouteRelative.DATASOURCES_VIEW}`,
    DATASOURCES_CREATE: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.DATASOURCES}/${AppRouteRelative.DATASOURCES_CREATE}`,
    DATASOURCES_UPDATE: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.DATASOURCES}/${AppRouteRelative.DATASOURCES_UPDATE}`,
    ALERT_TEMPLATES: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.ALERT_TEMPLATES}`,
    ALERT_TEMPLATES_ALL: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.ALERT_TEMPLATES}/${AppRouteRelative.ALERT_TEMPLATES_ALL}`,
    ALERT_TEMPLATES_CREATE: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.ALERT_TEMPLATES}/${AppRouteRelative.ALERT_TEMPLATES_CREATE}`,
    ALERT_TEMPLATES_ALERT_TEMPLATE: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.ALERT_TEMPLATES}/${AppRouteRelative.ALERT_TEMPLATES_ALERT_TEMPLATE}`,
    ALERT_TEMPLATES_ALERT_TEMPLATE_VIEW:
        `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.ALERT_TEMPLATES}/` +
        `${AppRouteRelative.ALERT_TEMPLATES_ALERT_TEMPLATE}/${AppRouteRelative.ALERT_TEMPLATES_ALERT_TEMPLATE_VIEW}`,
    ALERT_TEMPLATES_ALERT_TEMPLATE_UPDATE:
        `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.ALERT_TEMPLATES}/` +
        `${AppRouteRelative.ALERT_TEMPLATES_ALERT_TEMPLATE}/${AppRouteRelative.ALERT_TEMPLATES_ALERT_TEMPLATE_UPDATE}`,
    METRICS: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.METRICS}`,
    METRICS_ALL: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.METRICS}/${AppRouteRelative.METRICS_ALL}`,
    METRICS_VIEW: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.METRICS}/${AppRouteRelative.METRICS_VIEW}`,
    METRICS_CREATE: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.METRICS}/${AppRouteRelative.METRICS_CREATE}`,
    METRICS_UPDATE: `/${AppRouteRelative.CONFIGURATION}/${AppRouteRelative.METRICS}/${AppRouteRelative.METRICS_UPDATE}`,
    ROOT_CAUSE_ANALYSIS: `/${AppRouteRelative.ROOT_CAUSE_ANALYSIS}`,
    ROOT_CAUSE_ANALYSIS_FOR_ANOMALY: `/${AppRouteRelative.ROOT_CAUSE_ANALYSIS}/${AppRouteRelative.ROOT_CAUSE_ANALYSIS_FOR_ANOMALY}`,
    ROOT_CAUSE_ANALYSIS_FOR_ANOMALY_INDEX: `/${AppRouteRelative.ROOT_CAUSE_ANALYSIS}/${AppRouteRelative.ROOT_CAUSE_ANALYSIS_FOR_ANOMALY_INDEX}`,
} as const;

export const getBasePath = (): string => {
    return AppRoute.BASE;
};

export const getHomePath = (): string => {
    return AppRoute.HOME;
};

export const getAlertsPath = (): string => {
    return createPathWithRecognizedQueryString(AppRoute.ALERTS);
};

export const getAlertsAllPath = (): string => {
    return createPathWithRecognizedQueryString(AppRoute.ALERTS_ALL);
};

export const getAlertsViewPath = (id: number): string => {
    let path: string = AppRoute.ALERTS_ALERT;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return createPathWithRecognizedQueryString(path);
};

export const getAlertsCreatePath = (): string => {
    return createPathWithRecognizedQueryString(AppRoute.ALERTS_CREATE);
};

export const getAlertsUpdatePath = (id: number): string => {
    let path: string = AppRoute.ALERTS_UPDATE;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return createPathWithRecognizedQueryString(path);
};

export const getAnomaliesPath = (): string => {
    return createPathWithRecognizedQueryString(AppRoute.ANOMALIES);
};

export const getAnomaliesAllPath = (searchTerm?: string): string => {
    const urlQuery = getRecognizedQuery();

    if (searchTerm) {
        urlQuery.set(SEARCH_TERM_QUERY_PARAM_KEY, searchTerm);
    }

    return `${AppRoute.ANOMALIES_ALL}?${urlQuery.toString()}`;
};

export const getAnomaliesAnomalyPath = (id: number): string => {
    let path: string = AppRoute.ANOMALIES_ANOMALY;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getAnomaliesAnomalyViewPath = (id: number): string => {
    let path: string = AppRoute.ANOMALIES_VIEW;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getConfigurationPath = (): string => {
    return createPathWithRecognizedQueryString(AppRoute.CONFIGURATION);
};

export const getSubscriptionGroupsPath = (): string => {
    return createPathWithRecognizedQueryString(AppRoute.SUBSCRIPTION_GROUPS);
};

export const getSubscriptionGroupsAllPath = (): string => {
    return AppRoute.SUBSCRIPTION_GROUPS_ALL;
};

export const getSubscriptionGroupsViewPath = (id: number): string => {
    let path: string = AppRoute.SUBSCRIPTION_GROUPS_VIEW;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getSubscriptionGroupsCreatePath = (): string => {
    return AppRoute.SUBSCRIPTION_GROUPS_CREATE;
};

export const getSubscriptionGroupsUpdatePath = (id: number): string => {
    let path: string = AppRoute.SUBSCRIPTION_GROUPS_UPDATE;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getDatasetsPath = (): string => {
    return AppRoute.DATASETS_ALL;
};

export const getDatasetsAllPath = (): string => {
    return AppRoute.DATASETS_ALL;
};

export const getDatasetsViewPath = (id: number): string => {
    let path: string = AppRoute.DATASETS_VIEW;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getDatasetsOnboardPath = (): string => {
    return AppRoute.DATASETS_ONBOARD;
};

export const getDatasetsUpdatePath = (id: number): string => {
    let path: string = AppRoute.DATASETS_UPDATE;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getDatasourcesPath = (): string => {
    return AppRoute.DATASOURCES;
};

export const getDatasourcesAllPath = (): string => {
    return AppRoute.DATASOURCES_ALL;
};

export const getDatasourcesViewPath = (id: number): string => {
    let path: string = AppRoute.DATASOURCES_VIEW;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getDatasourcesCreatePath = (): string => {
    return AppRoute.DATASOURCES_CREATE;
};

export const getDatasourcesUpdatePath = (id: number): string => {
    let path: string = AppRoute.DATASOURCES_UPDATE;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getAlertTemplatesPath = (): string => {
    return AppRoute.ALERT_TEMPLATES;
};

export const getAlertTemplatesAllPath = (): string => {
    return AppRoute.ALERT_TEMPLATES_ALL;
};

export const getAlertTemplatesViewPath = (id: number): string => {
    let path: string = AppRoute.ALERT_TEMPLATES_ALERT_TEMPLATE_VIEW;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getAlertTemplatesCreatePath = (): string => {
    return AppRoute.ALERT_TEMPLATES_CREATE;
};

export const getAlertTemplatesUpdatePath = (id: number): string => {
    let path: string = AppRoute.ALERT_TEMPLATES_ALERT_TEMPLATE_UPDATE;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getMetricsPath = (): string => {
    return AppRoute.METRICS;
};

export const getMetricsAllPath = (): string => {
    return AppRoute.METRICS_ALL;
};

export const getMetricsViewPath = (id: number): string => {
    let path: string = AppRoute.METRICS_VIEW;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getMetricsCreatePath = (): string => {
    return AppRoute.METRICS_CREATE;
};

export const getMetricsUpdatePath = (id: number): string => {
    let path: string = AppRoute.METRICS_UPDATE;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getRootCauseAnalysisForAnomalyPath = (id: number): string => {
    let path: string = AppRoute.ROOT_CAUSE_ANALYSIS_FOR_ANOMALY;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getRootCauseAnalysisForAnomalyIndexPath = (id: number): string => {
    let path: string = AppRoute.ROOT_CAUSE_ANALYSIS_FOR_ANOMALY_INDEX;
    path = path.replace(PLACEHOLDER_ROUTE_ID, `${id}`);

    return path;
};

export const getLoginPath = (): string => {
    return AppRoute.LOGIN;
};

export const getLogoutPath = (): string => {
    return AppRoute.LOGOUT;
};

// Creates path with only the recognized app query string key-value pairs from URL that are allowed
// to be carried forward when navigating
export const createPathWithRecognizedQueryString = (path: string): string => {
    return `${path}?${getRecognizedQuery().toString()}`;
};
