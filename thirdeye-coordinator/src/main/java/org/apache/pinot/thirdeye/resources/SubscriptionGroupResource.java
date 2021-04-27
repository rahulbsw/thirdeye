package org.apache.pinot.thirdeye.resources;

import static org.apache.pinot.thirdeye.ThirdEyeStatus.ERR_CRON_INVALID;
import static org.apache.pinot.thirdeye.ThirdEyeStatus.ERR_DUPLICATE_NAME;
import static org.apache.pinot.thirdeye.ThirdEyeStatus.ERR_ID_UNEXPECTED_AT_CREATION;
import static org.apache.pinot.thirdeye.datalayer.util.ThirdEyeSpiUtils.optional;
import static org.apache.pinot.thirdeye.resources.ResourceUtils.ensure;
import static org.apache.pinot.thirdeye.resources.ResourceUtils.ensureNull;
import static org.apache.pinot.thirdeye.util.ApiBeanMapper.toAlertSchemes;
import static org.apache.pinot.thirdeye.util.ApiBeanMapper.toSubscriptionGroupDTO;

import com.google.common.collect.ImmutableMap;
import io.swagger.annotations.Api;
import java.util.stream.Collectors;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.apache.pinot.thirdeye.api.AlertApi;
import org.apache.pinot.thirdeye.api.SubscriptionGroupApi;
import org.apache.pinot.thirdeye.auth.AuthService;
import org.apache.pinot.thirdeye.auth.ThirdEyePrincipal;
import org.apache.pinot.thirdeye.datalayer.bao.SubscriptionGroupManager;
import org.apache.pinot.thirdeye.datalayer.dto.SubscriptionGroupDTO;
import org.apache.pinot.thirdeye.datalayer.util.Predicate;
import org.apache.pinot.thirdeye.util.ApiBeanMapper;
import org.quartz.CronExpression;

@Api(tags = "Subscription Group")
@Singleton
@Produces(MediaType.APPLICATION_JSON)
public class SubscriptionGroupResource extends
    CrudResource<SubscriptionGroupApi, SubscriptionGroupDTO> {

  public static final String DEFAULT_CRON = "*/15 * * * * ?";
  private final SubscriptionGroupManager subscriptionGroupManager;

  @Inject
  public SubscriptionGroupResource(
      final SubscriptionGroupManager subscriptionGroupManager,
      final AuthService authService) {
    super(authService, subscriptionGroupManager, ImmutableMap.of());
    this.subscriptionGroupManager = subscriptionGroupManager;
  }

  @Override
  protected SubscriptionGroupDTO createDto(final ThirdEyePrincipal principal,
      final SubscriptionGroupApi api) {
    ensureNull(api.getId(), ERR_ID_UNEXPECTED_AT_CREATION);
    if (api.getCron() == null) {
      api.setCron(DEFAULT_CRON);
    }
    ensure(CronExpression.isValidExpression(api.getCron()), ERR_CRON_INVALID, api.getCron());
    ensure(
        subscriptionGroupManager.findByPredicate(Predicate.EQ("name", api.getName())).size() == 0,
        ERR_DUPLICATE_NAME);
    return toSubscriptionGroupDTO(api);
  }

  @Override
  protected SubscriptionGroupDTO updateDto(
      final ThirdEyePrincipal principal,
      final SubscriptionGroupApi api) {
    final SubscriptionGroupDTO dto = get(api.getId());

    optional(api.getName())
        .ifPresent(dto::setName);

    optional(api.getAlerts())
        .map(alerts -> alerts.stream()
            .map(AlertApi::getId)
            .collect(Collectors.toList()))
        .ifPresent(l -> dto.getProperties().put("detectionConfigIds", l));

    optional(api.getNotificationSchemes())
        .ifPresent(notificationSchemes -> dto.setAlertSchemes(toAlertSchemes(notificationSchemes)));

    optional(api.getCron())
        .ifPresent(cron -> {
          ensure(CronExpression.isValidExpression(cron), ERR_CRON_INVALID, cron);
          dto.setCronExpression(cron);
        });
    return dto;
  }

  @Override
  protected SubscriptionGroupApi toApi(final SubscriptionGroupDTO dto) {
    return ApiBeanMapper.toApi(dto);
  }
}
