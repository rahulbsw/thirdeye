import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingIndicator } from "../../components/loading-indicator/loading-indicator.component";
import { PageContainer } from "../../components/page-container/page-container.component";
import { PageContents } from "../../components/page-contents/page-contents.component";
import { PageNotFoundIndicator } from "../../components/page-not-found-indicator/page-not-found-indicator.component";
import { useAppBreadcrumbsStore } from "../../store/app-breadcrumbs-store/app-breadcrumbs-store";
import { PageNotFoundPageProps } from "./page-not-found-page.interfaces";

export const PageNotFoundPage: FunctionComponent<PageNotFoundPageProps> = (
    props: PageNotFoundPageProps
) => {
    const [loading, setLoading] = useState(true);
    const [setPageBreadcrumbs] = useAppBreadcrumbsStore((state) => [
        state.setPageBreadcrumbs,
    ]);
    const { t } = useTranslation();

    useEffect(() => {
        // Create page breadcrumbs
        setPageBreadcrumbs([
            {
                text: t("label.page-not-found"),
            },
        ]);

        setLoading(false);
    }, []);

    if (loading) {
        return (
            <PageContainer toolbar={props.pageContainerToolbar}>
                <LoadingIndicator />
            </PageContainer>
        );
    }

    return (
        <PageContainer toolbar={props.pageContainerToolbar}>
            <PageContents
                contentsCenterAlign
                hideTimeRange
                titleCenterAlign
                title={t("label.page-not-found")}
            >
                <PageNotFoundIndicator />
            </PageContents>
        </PageContainer>
    );
};
