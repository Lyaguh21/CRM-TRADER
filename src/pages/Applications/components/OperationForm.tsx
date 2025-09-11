// @ts-nocheck
import { useMemo, useState, useEffect, useRef } from "react";
import {
  Container,
  Title,
  Stepper,
  Group,
  Select,
  Button,
  TextInput,
  NumberInput,
  Textarea,
  Card,
  Text,
  Divider,
  Grid,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CustomSelect } from "../../../shared/CustomSelect/Select";
import {
  locationTypes,
  contactTypes,
  locations,
  cryptoCurrencies,
  cashCurrencies,
} from "../../../entities/OperationFormInfo";
import {
  IconClipboard,
  IconCopyCheck,
  IconMoneybag,
  IconChevronDown,
} from "@tabler/icons-react";
import axios from "axios";
import { API } from "../../../app/helpers";
import { useUserStore } from "../../../entities/stores/userStore";
import { notifications } from "@mantine/notifications";
import { NavLink } from "react-router-dom";

const CreateExchangeRequest = () => {
  const { userID } = useUserStore();
  const [active, setActive] = useState(0);
  const [exchangeType, setExchangeType] = useState<
    "CryptoToCurrency" | "CryptoToCurrency"
  >("CryptoToCurrency");
  const [autoCommission, setAutoCommission] = useState(true);
  const [adminMode, setAdminMode] = useState(false);
  const [passed, setPassed] = useState(false);

  const form = useForm({
    initialValues: {
      currencyFrom: "", //из чего
      currencyTo: "", // во что
      amount: 0, //сумма обмена
      rate: 10, //курс
      total: 0, //итоговая сумма
      location: "", //локация
      locationType: "point",
      comment: "",
    },
  });

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  // Функция для расчета итоговой суммы
  const calculateTotal = () => {
    const { amount, rate } = form.values;

    // Преобразуем в числа и проверяем на валидность
    const numAmount = Number(amount) || 0;
    const numRate = Number(rate) || 0;

    if (numRate === 0 || numAmount === 0) {
      form.setFieldValue("total", 0);
      return;
    }

    const calculatedTotal = numAmount * numRate;
    form.setFieldValue("total", calculatedTotal);
  };

  useEffect(() => {
    calculateTotal();
  }, [form.values.amount, form.values.rate, exchangeType]);

  // Обработчик изменения суммы
  const handleAmountChange = (value) => {
    form.setFieldValue("amount", value);
  };

  // Обработчик изменения курса
  const handleRateChange = (value) => {
    form.setFieldValue("rate", value);
  };

  // Обработчик изменения типа обмена
  const handleExchangeTypeChange = (value) => {
    setExchangeType(value);
    form.setFieldValue("currencyFrom", "");
    form.setFieldValue("currencyTo", "");
  };

  const handleSubmit = () => {
    axios
      .post(`${API}/trades?tgId=${userID}`, {
        TradeType: exchangeType,
        Currency:
          exchangeType === "CryptoToCurrency"
            ? form.values.currencyTo
            : form.values.currencyFrom,
        Crypto:
          exchangeType === "CryptoToCurrency"
            ? form.values.currencyFrom
            : form.values.currencyTo,
        Count: form.values.amount,
        Rate: form.values.rate,
        Place: form.values.location,
        Comments: form.values.comment,
      })
      .then(
        () =>
          notifications.show({
            title: "Успешно",
            message: "Заявка успешно создана",
            position: "bottom-center",
            color: "green",
            autoClose: 3000,
          }),
        setPassed(true)
      )
      .catch((err) =>
        notifications.show({
          title: "Ошибка",
          message: "Что-то пошло не так",
          position: "bottom-center",
          color: "red",
          autoClose: 3000,
        })
      );
  };

  return (
    <Container size="md" style={{ padding: "20px 0" }}>
      <Stepper
        active={active}
        orientation="vertical"
        onStepClick={setActive}
        px={15}
      >
        <Stepper.Step
          icon={<IconClipboard />}
          label="Тип операции"
          description="Выбор направления обмена"
        >
          <Card withBorder style={{ overflow: "visible" }}>
            <Grid>
              <Grid.Col span={12}>
                <CustomSelect
                  label="Тип обмена"
                  placeholder="Выберите тип операции"
                  size="lg"
                  value={exchangeType}
                  onChange={handleExchangeTypeChange}
                  data={[
                    { value: "CryptoToCurrency", label: "Крипта → Нал" },
                    { value: "CurrencyToCrypto", label: "Нал → Крипта" },
                  ]}
                />
              </Grid.Col>

              {/* Крипта -> Нал */}
              {exchangeType === "CryptoToCurrency" && (
                <>
                  <Grid.Col
                    span={12}
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    <CustomSelect
                      label="Покупатель отдает"
                      placeholder="Выберите криптовалюту"
                      size="lg"
                      value={form.values.currencyFrom}
                      onChange={(value) =>
                        form.setFieldValue("currencyFrom", value)
                      }
                      data={cryptoCurrencies}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <CustomSelect
                      label="Покупатель получает"
                      placeholder="Выберите валюту"
                      size="lg"
                      value={form.values.currencyTo}
                      onChange={(value) =>
                        form.setFieldValue("currencyTo", value)
                      }
                      data={cashCurrencies}
                    />
                  </Grid.Col>
                </>
              )}

              {/* Нал -> Крипта */}
              {exchangeType === "CurrencyToCrypto" && (
                <>
                  <Grid.Col span={12}>
                    <CustomSelect
                      label="Покупатель отдает"
                      placeholder="Выберите валюту"
                      size="lg"
                      value={form.values.currencyFrom}
                      onChange={(value) =>
                        form.setFieldValue("currencyFrom", value)
                      }
                      data={cashCurrencies}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <CustomSelect
                      label="Покупатель получает"
                      placeholder="Выберите криптовалюту"
                      size="lg"
                      value={form.values.currencyTo}
                      onChange={(value) =>
                        form.setFieldValue("currencyTo", value)
                      }
                      data={cryptoCurrencies}
                    />
                  </Grid.Col>
                </>
              )}
            </Grid>
          </Card>
        </Stepper.Step>

        <Stepper.Step
          icon={<IconMoneybag />}
          label="Сумма и курс"
          description="Расчет операции"
        >
          <Card withBorder>
            <Grid>
              <NumberInput
                label={`Количество ( ${
                  exchangeType === "CryptoToCurrency"
                    ? form.values.currencyFrom
                    : form.values.currencyTo
                })`}
                value={form.values.amount}
                onChange={handleAmountChange}
                min={0}
                w="100%"
                size="lg"
                hideControls
                step={1}
                style={{ marginBottom: "15px" }}
              />
            </Grid>

            <Grid mt={10}>
              <NumberInput
                label={`Курс обмена (${
                  exchangeType === "CryptoToCurrency"
                    ? form.values.currencyFrom
                    : form.values.currencyTo
                })`}
                value={form.values.rate}
                onChange={handleRateChange}
                w="100%"
                min={0}
                size="lg"
                hideControls
              />
            </Grid>

            <Divider style={{ margin: "15px 0" }} />

            <Box
              style={{
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "5px",
              }}
            >
              <Text size="lg" fw={500}>
                Итоговая сумма: {form.values.total}{" "}
                {exchangeType === "CryptoToCurrency"
                  ? form.values.currencyTo
                  : form.values.currencyFrom}
              </Text>
              <Text size="sm" color="dimmed">
                {`${form.values.amount} * ${
                  form.values.rate
                } = ${form.values.total.toFixed(2)}`}
              </Text>
            </Box>
          </Card>
        </Stepper.Step>

        <Stepper.Step
          label="Детали сделки"
          description="Место и контакты"
          icon={<IconCopyCheck />}
        >
          <Card withBorder>
            <Select
              label="Точка сделки"
              size="lg"
              placeholder="Выберите место проведения"
              value={form.values.locationType}
              onChange={(value) => form.setFieldValue("locationType", value)}
              data={[
                { value: "point", label: "Выбрать из списка" },
                { value: "custom", label: "Произвольный адрес" },
              ]}
              style={{ marginBottom: "15px" }}
            />

            {form.values.locationType === "point" ? (
              <Select
                label="Выберите точку"
                size="lg"
                placeholder="Выберите из списка"
                value={form.values.location}
                onChange={(value) => form.setFieldValue("location", value)}
                data={locations}
                style={{ marginBottom: "15px" }}
              />
            ) : (
              <TextInput
                label="Адрес сделки"
                size="lg"
                placeholder="Введите адрес"
                value={form.values.location}
                onChange={(event) =>
                  form.setFieldValue("location", event.currentTarget.value)
                }
                style={{ marginBottom: "15px" }}
              />
            )}

            <Textarea
              label="Комментарий (необязательно)"
              size="lg"
              placeholder="Дополнительная информация"
              value={form.values.comment}
              onChange={(event) =>
                form.setFieldValue("comment", event.currentTarget.value)
              }
              style={{ marginBottom: "15px" }}
            />
          </Card>
        </Stepper.Step>

        <Stepper.Completed>
          <Card withBorder style={{ marginTop: "20px" }}>
            <Title order={3} style={{ marginBottom: "20px" }}>
              Подтверждение заявки
            </Title>

            <Box style={{ marginBottom: "15px" }}>
              <Text>
                <strong>Тип операции:</strong>{" "}
                {exchangeType === "CryptoToCurrency"
                  ? "Крипта → Нал"
                  : "Нал → Крипта"}
              </Text>
              <Text>
                <strong>Отдаете:</strong> {form.values.currencyFrom}
              </Text>
              <Text>
                <strong>Получаете:</strong> {form.values.currencyTo}
              </Text>
              <Text>
                <strong>Количество:</strong> {form.values.amount}{" "}
                {exchangeType === "CryptoToCurrency"
                  ? form.values.currencyFrom
                  : form.values.currencyTo}
              </Text>

              <Text>
                <strong>Курс:</strong> {form.values.rate}
              </Text>
              <Text>
                <strong>Итоговая сумма:</strong> {form.values.total}{" "}
                {exchangeType === "CryptoToCurrency"
                  ? form.values.currencyTo
                  : form.values.currencyFrom}
              </Text>

              {form.values.comment && (
                <Text style={{ textWrap: "wrap" }}>
                  <strong>Комментарий:</strong> {form.values.comment}
                </Text>
              )}
            </Box>

            <Box
              style={{
                padding: "15px",
                backgroundColor: "#e6f7ff",
                borderRadius: "5px",
              }}
            >
              <Text fw={500}>
                После создания заявка появится в списке заявок или в окне «Мои
                заявки».
              </Text>
            </Box>
          </Card>
        </Stepper.Completed>
      </Stepper>

      {!passed && (
        <Group my="15" px={15}>
          {active !== 0 && (
            <Button variant="default" onClick={prevStep} size="lg">
              Назад
            </Button>
          )}
          {active !== 3 ? (
            <Button onClick={nextStep} size="lg">
              Далее
            </Button>
          ) : (
            <Button size="lg" onClick={handleSubmit}>
              Создать заявку
            </Button>
          )}
        </Group>
      )}

      {passed && (
        <NavLink to="/">
          <Group mt="15" px={15}>
            <Button fullWidth size="lg">
              В главное меню
            </Button>
          </Group>
        </NavLink>
      )}
    </Container>
  );
};

export default CreateExchangeRequest;
