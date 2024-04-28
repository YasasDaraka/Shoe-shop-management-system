package lk.ijse.gdse66.helloshoes.service.util;

import lk.ijse.gdse66.helloshoes.dto.*;
import lk.ijse.gdse66.helloshoes.entity.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.stream.Collectors;


@Component
public class Tranformer {
    @Autowired
    private ModelMapper mapper;

    public enum ClassType {
        USER_DTO,
        USER_ENTITY,
        CUS_DTO,
        CUS_ENTITY,
        CUS_DTO_LIST,
        EMP_DTO,
        EMP_ENTITY,
        EMP_DTO_LIST,
        SUP_DTO,
        SUP_ENTITY,
        SUP_DTO_LIST,
        ITEM_DTO,
        ITEM_ENTITY,
        ITEM_DTO_LIST,
        ITEM_ENTITY_LIST,
        ORDER_DETAILS_ENTITY,
        ORDER_DETAILS_DTO,
        ORDER_ENTITY,
        ORDER_DTO,
        ORDER_DTO_LIST,
        ORDER_DETAILS_DTO_LIST
    }

    public <R> R convert(Object from, ClassType to) {
        /*if (getType(to) instanceof OrderDetailsDTO) {
            return (R) toOrderDetailsDTO((OrderDetails) from);
        }
        if (getType(to) instanceof OrderDetails) {
            return (R) toOrderDetailsEntity((OrderDetailsDTO) from);
        }
        if (to.equals(ClassType.ORDER_ENTITY)) {
            return (R) toOrderEntity((OrderDTO) from);
        }
        if (to.equals(ClassType.ORDER_DTO)) {
            return (R) toOrderDTO((Order) from);
        }
        if (to.equals(ClassType.ORDER_DTO_LIST)){
            return (R) toOrderDTOList((List<Order>) from);
        }
        if (to.equals(ClassType.ORDER_DETAILS_DTO_LIST)){
            return (R) toOrderDetailDTOList((List<OrderDetails>) from);
        }*/
        return (R) mapper.map(from, getType(to));

    }
    /*public List<OrderDTO> toOrderDTOList(List<Order> orders) {
        return orders.stream()
                .map(this::toOrderDTO)
                .collect(Collectors.toList());
    }
    public List<OrderDetailsDTO> toOrderDetailDTOList(List<OrderDetails> orders) {
        return orders.stream()
                .map(this::toOrderDetailsDTO)
                .collect(Collectors.toList());
    }
    public OrderDTO toOrderDTO(Order order) {
        OrderDTO orderDTO = mapper.typeMap(Order.class, OrderDTO.class)
                .addMapping(src -> src.getOid(), OrderDTO::setOid)
                .addMapping(src -> src.getCustomer().getId(), OrderDTO::setCusID)
                .addMapping(src -> src.getDate(), OrderDTO::setDate)
                .addMappings(mapper -> mapper.skip(OrderDTO::setOrderDetails))
                .map(order);
        List<OrderDetailsDTO> orderDetailsDTOList = order.getOrderDetails().stream()
                .map(this::toOrderDetailsDTO)
                .collect(Collectors.toList());
        orderDTO.setOrderDetails(orderDetailsDTOList);

        return orderDTO;
    }

    public OrderDetailsDTO toOrderDetailsDTO(OrderDetails orderDetail) {
        return mapper.typeMap(OrderDetails.class, OrderDetailsDTO.class)
                .addMapping(src -> src.getOrderDetailPK().getOid(), OrderDetailsDTO::setOid)
                .addMapping(src -> src.getItem().getItmCode(), OrderDetailsDTO::setItmCode)
                .addMapping(src -> src.getItem().getItmPrice(), OrderDetailsDTO::setItmPrice)
                .addMapping(src -> src.getItmQTY(), OrderDetailsDTO::setItmQTY)
                .map(orderDetail);
    }

*/
    private Type getType(ClassType type) {
        switch (type) {
            case USER_DTO:
                return UserDTO.class;
            case USER_ENTITY:
                return User.class;
            case CUS_DTO:
                return CustomerDTO.class;
            case CUS_ENTITY:
                return Customer.class;
            case CUS_DTO_LIST:
                return new TypeToken<ArrayList<CustomerDTO>>() {}.getType();
            case EMP_DTO:
                return EmployeeDTO.class;
            case EMP_ENTITY:
                return Employee.class;
            case EMP_DTO_LIST:
                return new TypeToken<ArrayList<EmployeeDTO>>() {}.getType();
            case SUP_DTO:
                return SupplierDTO.class;
            case SUP_ENTITY:
                return Supplier.class;
            case SUP_DTO_LIST:
                return new TypeToken<ArrayList<SupplierDTO>>() {}.getType();
            case ITEM_DTO:
                return InventoryDTO.class;
            case ITEM_ENTITY:
                return Inventory.class;
            case ITEM_DTO_LIST:
                return new TypeToken<ArrayList<InventoryDTO>>() {}.getType();
            /*case ORDER_DETAILS_DTO:
                return OrderDetailsDTO.class;
            case ORDER_DETAILS_ENTITY:
                return OrderDetails.class;*/
            case ORDER_ENTITY:
                return Sales.class;
            case ORDER_DTO:
                return SalesDTO.class;
            case ORDER_DTO_LIST:
                return new TypeToken<ArrayList<SalesDTO>>() {}.getType();
            /*case ORDER_DETAILS_DTO_LIST:
                return new TypeToken<ArrayList<OrderDetailsDTO>>() {}.getType();*/
            default:
                throw new IllegalArgumentException("Unsupported ClassType: " + type);
        }
    }
}
